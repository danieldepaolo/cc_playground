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
  let totalBonus = cards.reduce( (bonus, card) => {
    bonus -= card.fees.annual;
    bonus += card.perks.reduce( (bonus, perk) => {
      return bonus + perk.defaultValue;
    }, 0);
    return bonus;
  }, 0);
  console.log(totalBonus);

  // calculate bonus
  transactions.forEach(transaction => {
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

    totalBonus += bestBonus;
  });

  return totalBonus;
}

module.exports = {
  getBonusWithCards: getBonusWithCards
};
