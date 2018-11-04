const express = require("express");
const router = express.Router();

const Transaction = require('../models/transaction');

// GET all transactions
router.get("/transactions", (req, res) => {
  Transaction.find({}, (err, transactions) => {
    res.json({
      error: err || null,
      message: err ? "Unable to retrieve transactions" : "Successfully retrieved transactions!",
      transactions: !err ? transactions : []
    });
  });
});

// get a particular transaction
router.get("/transactions/:id", (req, res) => {
  const { id } = req.params;

  Transaction.findById(id, (err, foundTransaction) => {
    res.json({
      error: err || null,
      message: err ? "Unable to retrieve transaction" : "Successfully retrieved transaction!",
      transaction: !err ? transaction : null
    });
  });
});

// add transaction(s) to database
// accepts array of JSON objects each representing a transaction
router.post("/transactions", (req, res) => {
  let { transactions } = req.body; // shorthand for if we send via form with special names

  // We only want debit transactions (not credit)
  transactions = transactions.filter(transaction => transaction['Transaction Type'] === 'debit');

  // Convert to database format
  transactions = transactions.map(transaction => fromTransactionToDbTransaction(transaction));

  Transaction.insertMany(transactions, (err, insertedTransactions) => {
    res.json({
      error: err || null,
      message: err ? "Unable to add transactions" : "Successfully added transactions!",
      transactions: !err ? insertedTransactions : []
    });
  });
});

// modify a particular transaction
router.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { transaction } = req.body;

  Transaction.replaceOne({_id: id}, transaction, (err, updatedTransaction) => {
    res.json({
      error: err || null,
      message: err ? "Unable to update transaction" : "Updated transaction!",
      transaction: updatedTransaction
    });
  });
});

// delete a transaction
router.delete("/transactions/:id", (req, res) => {
  Transaction.deleteOne({_id: req.params.id}, err => {
    res.json({
      error: err || null,
      message: err ? "Unable to delete transaction" : "Successfully deleted transaction!"
    });
  });
});

function fromTransactionToDbTransaction(transaction) {
  return {
    date: transaction.Date,
    merchant: transaction.Description, // Merchant name as it appears for transaction.
    category: transaction.Category, // "Restaurants", "Gas & Fuel", "Entertainment" ...
    amount: transaction.Amount
  };
}

module.exports = router;
