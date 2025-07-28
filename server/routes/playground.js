const express = require("express");
const router = express.Router();
const passport = require('passport');

const calc = require('../businessLogic/calculations');

// models
const Card = require('../models/card');

// Used to calculate the bonus value
router.get("/playground/calcbonus", passport.authenticate('jwt', {session: false}), async (req, res) => {
  // get cards from the query string
  let { card_id } = req.query;
  if (!Array.isArray(card_id)) {
    card_id = [card_id];
  }

  if (card_id) {
    let foundCards = []

    try {
      foundCards = await Card.find({ _id: {$in: card_id} })
      .populate('rewardCurrency')
      .populate('perks')
      .exec();
    } catch (err) {
      console.error(err);

      res.json({
        error: "Unable to find card in DB: " + card_id,
        bonusReport: null
      });
    }

    const transactions = req.user ? req.user.transactions : [];
    const bonusObj = calc.getBonusWithCards(foundCards, transactions);

    res.json({
      error: null,
      bonusReport: bonusObj
    });
  }
});

module.exports = router;
