const express = require("express");
const router = express.Router();

const testData = require("../test_data");

// GET all transactions
router.get("/transactions", (req, res) => {
  res.json(testData.testTransactions);
});

// get a particular transaction
router.get("/transactions/:id", (req, res) => {
  res.json(_.findWhere(testData.testTransactions, {id: req.params.id}));
});

// add transaction(s) to database
router.post("/transactions", (req, res) => {
  let { transaction } = req.body; // shorthand for if we send via form with special names
  transaction.id = testData.testTransactions.length;
  testData.testTransactions.push(transaction);

  res.json({
    message: "Successfully added transaction!"
  });
});

// modify a particular transaction
router.put("/transactions/:id", (req, res) => {
  const { transaction } = req.body; // shorthand for if we send via form with special names
  testData.testTransactions[transaction.id] = transaction;

  res.json({
    message: "Successfully modified transaction!"
  });
});

// delete a transaction
router.delete("/transactions/:id", (req, res) => {
  res.json({
    message: "Reached transactions destroy route"
  });
});

module.exports = router;
