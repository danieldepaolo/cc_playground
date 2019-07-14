const _ = require('underscore'),
      moment = require('moment');

const merch = require('../constants/nonAcceptMerchants');
      
// $TODO
// 1. Handle quarterly bonuses like with Chase Freedom
// 2. Handle delivery type (Chase Pay, Google pay...)
// 3. Have merchants linked to transactions (from merchant table)
function getReturnForTransaction(card, transaction) {
  // $TODO stop short and return 0 if merchant doesn't accept card
  let returns = {
    default: card.defaultReturn,
    merchant: 0,
    product: 0
  };

  const merchantInfo = _.find(merch.nonAcceptMerchants, merchant => {
    return merchant.name === transaction.merchant
      || merchant.otherNames.includes(transaction.merchant)
    });

  if (merchantInfo && !merchantInfo.processorAcceptance[card.processor]) {
    return 0;
  }

  const { categories } = card.bonusReward;
  if ('merchant' in categories) {
    const bonusCategory = _.findWhere(categories.merchant, {name: transaction.merchant});
    if (bonusCategory) {
      returns.merchant = bonusCategory.bonusReturn;
    }
  }
  if ('product' in categories) {
    const bonusCategory = _.findWhere(categories.product, {name: transaction.category});
    if (bonusCategory) {
      returns.product = bonusCategory.bonusReturn;
    }
  }

  return Math.max(returns.default, returns.merchant, returns.product);
}

// $TODO
// 0. Adjust bonus for card fees and perk values
// 1. Take into account special bonuses like annual bonus
// 2. Keep track and return [{transaction id, bestCard, bestBonus}...]
// 3. Normalize to one year?
function getBonusWithCards(cards, transactions) {
  console.log(cards);
  // Start our bonus by subtracting fees and adding perk values
  let annualValue = cards.reduce( (bonus, card) => {
    bonus -= card.fees.annual;
    bonus += card.perks.reduce( (bonus, perk) => {
      return bonus + perk.defaultValue;
    }, 0);
    return bonus;
  }, 0);

  // Bonus earned per transaction!
  let transactionInfo = [];
  let transactionBonusTotal = 0;
  let currencyBonus = {};

  // calculate bonus
  if (cards.length) {
    transactions.forEach( transaction => {
      let optimalCard = cards[0];
      let bestBonus = {
        points: 0,
        value: 0
      };

      cards.forEach(card => {
        const returnWithCard = getReturnForTransaction(card, transaction);

        // 0.01 at the end converts back down to cents, since card point value is in cents
        const pointsEarned = transaction.amount * returnWithCard;
        const bonusValue = pointsEarned * card.rewardCurrency.defaultValue * 0.01;
        if (bonusValue > bestBonus.value) {
          bestBonus.points = pointsEarned;
          bestBonus.value = bonusValue;
          optimalCard = card;
        }
      });

      if (!(optimalCard.rewardCurrency.name in currencyBonus)) {
        currencyBonus[optimalCard.rewardCurrency.name] = bestBonus.points;
      } else {
        currencyBonus[optimalCard.rewardCurrency.name] += bestBonus.points;
      }

      transactionInfo.push({
        transaction: transaction,
        cardUsed: optimalCard,
        pointsEarned: bestBonus.points,
        bonusValue: bestBonus.value
      });

      transactionBonusTotal += bestBonus.value;
    });
  }

  console.log(currencyBonus);

  let returnObj = {
    currencyEarned: currencyBonus,
    totalBonusValue: 0,
    transactionInfo: transactionInfo
  };

  // Adjust transaction bonus to one year period to match the perks/fees
  if (transactionBonusTotal > 0) {
    transactions.sort( (a,b) => a.date - b.date);
    const firstTransaction = moment(_.first(transactions).date);
    const lastTransaction = moment(_.last(transactions).date);
    let monthSpan = lastTransaction.diff(firstTransaction, 'months');

    const adjustedTransactionBonus = monthSpan === 0 
      ? transactionBonusTotal
      : transactionBonusTotal / (monthSpan / 12);

    returnObj.totalBonusValue = annualValue + adjustedTransactionBonus;
  } else {
    returnObj.totalBonusValue = annualValue;
  }

  return returnObj;
}

module.exports = {
  getBonusWithCards: getBonusWithCards
};
