const express = require("express");
const router = express.Router();
const passport = require('passport');

const utils = require('../businessLogic/utils');
const Transaction = require('../models/transaction');

// GET all transactions
router.get("/transactions", passport.authenticate('jwt', {session: false}), (req, res) => {
  const { transactions } = req.user;
  console.log(transactions);
  res.json({
    transactions: transactions
  });
});

// // get a particular transaction
// router.get("/transactions/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
//   const { id } = req.params;

//   Transaction.findById(id, (err, foundTransaction) => {
//     res.json({
//       error: err || null,
//       message: err ? "Unable to retrieve transaction" : "Successfully retrieved transaction!",
//       transaction: !err ? transaction : null
//     });
//   });
// });

// add transaction(s) to database
// accepts array of JSON objects each representing a transaction
router.post("/transactions", passport.authenticate('jwt', {session: false}), async (req, res) => {
  let { transactions } = req.body; // shorthand for if we send via form with special names

  // We only want debit transactions (not credit)
  let newTransactions = transactions.filter(transaction => transaction['Transaction Type'] === 'debit');
  // Convert to database format
  newTransactions = newTransactions.map(transaction => fromTransactionToDbTransaction(transaction));

  const userTransactions = req.user.transactions;
  const nonDuplicateTransactions = utils.getNonDuplicateTransactions(userTransactions, newTransactions);
  req.user.transactions.push(...nonDuplicateTransactions);
  req.user.save();
  
  res.json({
    addedTransactions: nonDuplicateTransactions
  });
});

// modify a particular transaction
router.put("/transactions/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
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
router.delete("/transactions/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  Transaction.deleteOne({_id: req.params.id}, err => {
    res.json({
      error: err || null,
      message: err ? "Unable to delete transaction" : "Successfully deleted transaction!"
    });
  });
});

function fromTransactionToDbTransaction(transaction) {
  return {
    date: utils.dateFromSlashStr(transaction.Date),
    merchant: transaction.Description, // Merchant name as it appears for transaction.
    category: transaction.Category, // "Restaurants", "Gas & Fuel", "Entertainment" ...
    amount: Number(transaction.Amount)
  };
}

module.exports = router;
