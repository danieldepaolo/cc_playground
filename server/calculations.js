const _ = require('underscore');

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

  const { categories } = card.bonus;
  if (categories.hasOwnProperty('merchants')) {
    const bonusCategory = _.findWhere(categories.merchant, {category: transaction.merchant});
    if (bonusCategory) {
      bonuses.merchant = bonusCategory.bonus;
    }
  }
  if (categories.hasOwnProperty('product')) {
    const bonusCategory = _.findWhere(categories.product, {category: transaction.productType});
    if (bonusCategory) {
      bonuses.product = bonusCategory.bonus;
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
  let totalBonus = 0;

  // calculate bonus
  transactions.forEach(transaction => {
    optimalCard = null;
    bestBonus = 0;
    cards.forEach(card => {
      const returnWithCard = getReturnForTransaction(card, transaction);

      // 0.01 at the end converts back down to cents, since card point value is in cents
      const bonusValue = transaction.amount * returnWithCard * card.ptValue * 0.01;
      if (bonusValue > bestBonus) {
        bestBonus = bonusValue;
        optimalCard = card;
      }
    });

    totalBonus += bestBonus;
  });

  return totalBonus;
}

module.exports = {
  getBonusWithCards: getBonusWithCards
};
