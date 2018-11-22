const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {type: Date, required: true},
  merchant: {type: String, required: true}, // Merchant name as it appears for transaction.
  category: {type: String, required: true}, // "Restaurants", "Gas & Fuel", "Entertainment" ...
  deliveryMethod: {type: String, default: "N"}, // "N" (normal), "Chase Pay", "Apple Pay", ...
  amount: {type: Number, required: true}
});

module.exports = transactionSchema;
