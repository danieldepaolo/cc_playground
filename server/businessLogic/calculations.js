const _ = require('underscore'),
      moment = require('moment');

// $TODO
// 1. Handle quarterly bonuses like with Chase Freedom
// 2. Handle delivery type (Chase Pay, Google pay...)
function getReturnForTransaction(card, transaction) {
  // $TODO stop short and return 0 if merchant doesn't accept card

  let returns = {
    default: card.defaultReturn,
    merchant: 0,
    product: 0
  };

  const { categories } = card.bonusReward;
  if ('merchant' in categories) {
    const bonusCategory = _.findWhere(categories.merchant, {category: transaction.merchant});
    if (bonusCategory) {
      returns.merchant = bonusCategory.bonusReturn;
    }
  }
  if ('product' in categories) {
    const bonusCategory = _.findWhere(categories.product, {category: transaction.category});
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
  // Start our bonus by subtracting fees and adding perk values
  let annualValue = cards.reduce( (bonus, card) => {
    bonus -= card.fees.annual;
    bonus += card.perks.reduce( (bonus, perk) => {
      return bonus + perk.defaultValue;
    }, 0);
    return bonus;
  }, 0);

  // calculate bonus
  const totalTransactionBonus = transactions.reduce( (total, transaction) => {
    optimalCard = null;
    bestBonus = 0;
    cards.forEach(card => {
      const returnWithCard = getReturnForTransaction(card, transaction);

      // 0.01 at the end converts back down to cents, since card point value is in cents
      const bonusValue = transaction.amount * returnWithCard * card.rewardCurrency.defaultValue * 0.01;
      if (bonusValue > bestBonus) {
        bestBonus = bonusValue;
        optimalCard = card;
      }
    });

    return total + bestBonus;
  }, 0);

  // Adjust transaction bonus to one year period to match the perks/fees
  if (totalTransactionBonus > 0) {
    transactions.sort( (a,b) => a.date - b.date);
    const firstTransaction = moment(_.first(transactions).date);
    const lastTransaction = moment(_.last(transactions).date);
    let monthSpan = lastTransaction.diff(firstTransaction, 'months');

    const adjustedTransactionBonus = monthSpan === 0 
      ? totalTransactionBonus
      : totalTransactionBonus / (monthSpan / 12);
    return annualValue + adjustedTransactionBonus;
  } else {
    return annualValue;
  }
}

module.exports = {
  getBonusWithCards: getBonusWithCards
};
