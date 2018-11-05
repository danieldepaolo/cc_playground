const express = require("express");
const router = express.Router();

const calc = require('../businessLogic/calculations');

// models
const Card        = require('../models/card'),
      Transaction = require('../models/transaction');

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

router.get("/playground/calcbonus", (req, res) => {
  // get cards from the query string
  let { card_id } = req.query;
  if (!Array.isArray(card_id)) {
    card_id = [card_id];
  }

  if (card_id) {
    Card.find({ _id: {$in: card_id} })
      .populate('rewardCurrency')
      .populate('perks')
      .exec( (err, foundCards) => {
        if (err) {
          errors.push("Unable to find card in DB: " + cardId);
          console.error(err);
        } else {
          Transaction.find({}, (err, transactions) => {
            const bonus = calc.getBonusWithCards(foundCards, transactions);
            res.json({
              error: err,
              bonus: bonus
            });
          });
        }
    });
  }
});

module.exports = router;
