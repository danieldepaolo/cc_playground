const express = require("express");
const router = express.Router();

const _        = require('underscore'),
      passport = require('passport');

const Card = require("../models/card");
const middleware = require('../middleware');

// Types of annual bonus:
// 1. Reaching spend threshold
// 2. Reaching points threshold
// 3. Anniversary gift

// Types of reward currency:
// 1. credit ($)
// 2. points

// $TODO perks will be their own model and referenced in card

// get all cards
router.get("/cards", (req, res) => {
  Card.find({}, (err, allCards) => {
    res.json({
      error: err || null,
      message: err ? "Unable to retrieve cards" : "Retrieved all cards",
      cards: allCards
    });
  });
});

// get one card by id
router.get("/cards/:id", (req, res) => {
  const { id } = req.params;

  Card.findById(id).populate('rewardCurrency').populate('perks').exec( (err, foundCard) => {
    // We only want to send back the username for now
    res.json({
      error: err || null,
      message: err ? "Unable to retrieve card" : "Retrieved card!",
      card: foundCard
    });
  });
});

// add a new card to database
router.post("/cards", passport.authenticate('jwt', {session: false}), (req, res) => {
  const { card } = req.body;
  const cardDbObj = formCardToDbCard(card);

  Card.create(cardDbObj, (err, addedCard) => {
    addedCard.contributor = {
      id: req.user._id,
      username: req.user.username
    };
    addedCard.save();

    res.json({
      card: addedCard,
      error: err || null,
      message: err ? "Unable to add card" : "Successfully added card!"
    });
  });
});

// modify a particular card in database
router.put("/cards/:id",
          passport.authenticate('jwt', {session: false}),
          middleware.userCreatedCard,
          (req, res) => {
  const { id } = req.params;
  const { card } = req.body;
  const cardDbObj = formCardToDbCard(card);

  Card.replaceOne({_id: id}, cardDbObj, (err, updatedCard) => {
    res.json({
      error: err || null,
      message: err ? "Unable to update card" : "Updated card!",
      card: updatedCard
    });
  });
});

// delete one card
router.delete("/cards/:id",
              passport.authenticate('jwt', {session: false}),
              middleware.userCreatedCard,
              (req, res) => {
  const { id } = req.params;

  Card.findOneAndDelete({_id: id}, err => {
    res.json({
      error: err || null,
      message: err ? "Unable to delete card" : "Deleted card"
    });
  });
});

function formCardToDbCard(formCard) {
  return {
    name: formCard.name, // same
    processor: formCard.processor, // same
    imageUrl: formCard.imageUrl, // same
    defaultReturn: formCard.defaultReturn, // same
    rewardCurrency: formCard.selectedCurrency, // different
    fees: { // different
      annual: formCard.annualFee, // different
      foreign: formCard.ftf, // different
      waivedFirstYear: formCard.waivedFirstYear // same
    },
    bonusReward: {
      categories: formCard.addedCategories, // same
      signup: formCard.signupBonusActive ? formCard.signupBonus : undefined // different
      //special: $TODO
    },
    perks: formCard.selectedPerks // different
  }
}

module.exports = router;
