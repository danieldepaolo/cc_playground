const _ = require('underscore'),
      dayjs = require('dayjs');

const merch = require('../constants/nonAcceptMerchants');
const { categoryAltNamesMap } = require('../constants/rewardCategories');
      
// $TODO
// 1. Handle quarterly bonuses like with Chase Freedom
// 2. Handle delivery type (Chase Pay, Google pay...)
// 3. Have merchants linked to transactions (from merchant table)
function getReturnForTransaction(card, transaction) {
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

  const merchantCategory = _.findWhere(categories, { categoryType: 'merchant', name: transaction.merchant });
  if (merchantCategory) {
    returns.merchant = merchantCategory.bonusReturn;
  }

  const productCategory = _.find(categories, (category) => {
      const withAltNames = [category.name, ...(categoryAltNamesMap[category.name] || [])];
      return category.categoryType === 'product' && withAltNames.includes(transaction.category);
    });

  if (productCategory) {
    returns.product = productCategory.bonusReturn;
  }

  return Math.max(returns.default, returns.merchant, returns.product);
}

// $TODO
// 1. Take into account special bonuses like annual bonus
function getBonusWithCards(cards, transactions) {
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

  let returnObj = {
    currencyEarned: currencyBonus,
    totalBonusValue: 0,
    transactionInfo: transactionInfo
  };

  // Adjust transaction bonus to one year period to match the perks/fees
  if (transactionBonusTotal > 0) {
    transactions.sort( (a,b) => a.date - b.date);
    const firstTransaction = dayjs(_.first(transactions).date);
    const lastTransaction = dayjs(_.last(transactions).date);
    let daysSpan = lastTransaction.diff(firstTransaction, 'day');

    const adjustedTransactionBonus = transactionBonusTotal / daysSpan * 365;

    returnObj.totalBonusValue = annualValue + adjustedTransactionBonus;
  } else {
    returnObj.totalBonusValue = annualValue;
  }

  return returnObj;
}

module.exports = {
  getBonusWithCards: getBonusWithCards
};
