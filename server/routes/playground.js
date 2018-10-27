const express = require("express");
const router = express.Router();

const calc = require('../calculations');
const testData = require("../test_data");

// Used to calculate the bonus value
// Response has overall bonus and FUTURE FEATURE bonus per transaction
// $TODO FUTURE: Plus card used for each transaction to get that bonus
/*
  {
    overallBonus: x,
    transactions: [{
      id: =transaction id=,
      cardUsed: =card id=,
      bonus: y
    }]
  }
*/
// router.get("/playground", (req, res) => {
  
  
// });

router.get("/playground/calcbonus", (req, res) => {
  // get cards from the query string
  const { card_id } = req.query;
  let cards = [];
  if (card_id) {
    if (Array.isArray(card_id)) {
      cards = card_id.map(cardId => testData.testCards[cardId]);
    } else {
      cards.push(testData.testCards[card_id]);
    }
  }

  const bonus = calc.getBonusWithCards(cards, testData.testTransactions);
  res.json({
    bonus: bonus
  });
});

module.exports = router;
