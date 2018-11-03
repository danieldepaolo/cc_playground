const express = require("express");
const router = express.Router();

const calc = require('../calculations');
const testData = require('../test_data');
const Card = require('../models/card');

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
  let { card_id } = req.query;
  if (!Array.isArray(card_id)) {
    card_id = [card_id];
  }

  if (card_id) {
    Card.find({ _id: {$in: card_id} }).populate('rewardCurrency').exec( (err, foundCards) => {
      if (err) {
        errors.push("Unable to find card in DB: " + cardId);
        console.error(err);
      } else {
        const bonus = calc.getBonusWithCards(foundCards, testData.testTransactions);
        res.json({
          error: err,
          bonus: bonus
        });
      }
    });
  }
});

module.exports = router;
