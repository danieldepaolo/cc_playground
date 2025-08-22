const express = require("express");
const router = express.Router();
const passport = require("passport");
const dayjs = require("dayjs");

const utils = require("../businessLogic/utils");
const Transaction = require("../models/transaction");

// GET all transactions
router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { transactions } = req.user;

    res.json({
      transactions: transactions,
    });
  }
);

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
router.post(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { transactions } = req.body; // shorthand for if we send via form with special names

    // We only want debit transactions (not credit)
    // Also convert negative to positive
    let newTransactions = transactions
      .filter((transaction) => Number(transaction["Amount"]) < 0)
      .map((transaction) => ({
        ...transaction,
        Amount: Math.abs(transaction.Amount),
      }));

    // Convert to database format
    newTransactions = newTransactions.map((transaction) =>
      fromTransactionToDbTransaction(transaction)
    );

    const userTransactions = req.user.transactions;
    const nonDuplicateTransactions = utils.getNonDuplicateTransactions(
      userTransactions,
      newTransactions
    );
    req.user.transactions.push(...nonDuplicateTransactions);
    req.user.save();

    res.json({
      addedTransactions: nonDuplicateTransactions,
    });
  }
);

// modify a particular transaction
router.put(
  "/transactions/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { transaction } = req.body;

    let updatedTransaction,
      err = null;

    try {
      updatedTransaction = await Transaction.replaceOne(
        { _id: id },
        transaction
      );
    } catch (error) {
      err = error;
    } finally {
      res.json({
        error: err,
        message: err ? "Unable to update transaction" : "Updated transaction!",
        transaction: updatedTransaction,
      });
    }
  }
);

// delete a transaction
router.delete(
  "/transactions/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let err = null;

    try {
      await Transaction.deleteOne({ _id: req.params.id });
    } catch (error) {
      err = error;
    } finally {
      res.json({
        error: err,
        message: err
          ? "Unable to delete transaction"
          : "Successfully deleted transaction!",
      });
    }
  }
);

// Monarch Money CSV headers
/*
Date,Merchant,Category,Account,Original Statement,Notes,Amount,Tags
*/

function fromTransactionToDbTransaction(transaction) {
  return {
    date: dayjs(transaction.Date, "YYYY-MM-DD").toDate(),
    merchant: transaction.Merchant, // Merchant name as it appears for transaction.
    category: transaction.Category, // "Restaurants", "Gas & Fuel", "Entertainment" ...
    amount: Math.abs(Number(transaction.Amount)),
  };
}

module.exports = router;
