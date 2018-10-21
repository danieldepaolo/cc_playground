const express = require("express");
const router = express.Router();

const testData = require("../test_data");
const _ = require('underscore');

const Perk = require("../models/perk");

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
  res.json(testData.testCards);
});

// get one card by id
router.get("/cards/:id", (req, res) => {
  res.json(_.findWhere(testData.testCards, {id: req.params.id}));
});

// add a new card to database
router.post("/cards", (req, res) => {
  console.log(req.body);
  //const { card } = req.body;
  //card.id = testData.testCards.length;
  //testData.testCards.push(card);

  res.json({
    message: `Successfully added card!`
  });
});

// modify a particular card in database
router.put("/cards/:id", (req, res) => {
  const { card } = req.body; // shorthand for if we send via form with special names
  testData.testCards[card.id] = card;

  res.json({
    message: "Successfully modified card!"
  });
});

// delete one card
router.delete("/cards/:id", (req, res) => {
  res.json({
    message: "Reached Cards destroy route"
  });
});

module.exports = router;
