const express = require("express");
const router = express.Router();
const passport = require('passport');

const calc = require('../businessLogic/calculations');

// models
const Card = require('../models/card');

// Used to calculate the bonus value
router.get("/playground/calcbonus", passport.authenticate('jwt', {session: false}), (req, res) => {
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
          console.error(err);
          res.json({
            error: "Unable to find card in DB: " + cardId,
            bonusReport: null
          });
        } else {
          const transactions = req.user ? req.user.transactions : [];
          const bonusObj = calc.getBonusWithCards(foundCards, transactions);
          res.json({
            error: err,
            bonusReport: bonusObj
          });
        }
    });
  }
});

module.exports = router;
