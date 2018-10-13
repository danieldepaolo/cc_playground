const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: Date,
  merchant: String, // Merchant name as it appears for transaction.
  category: String, // "Restaurants", "Gas & Fuel", "Entertainment" ...
  deliveryMethod: String, // "N" (normal), "Chase Pay", "Apple Pay", ...
  amount: Number
});

module.exports = mongoose.model("Transaction", transactionSchema);
