const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: Date,
  /* 
    Merchant name as it appears for transaction. 
    NOT a ref to merchant model as that would involve a *TON* of work to make sure all 
    merchants are in the database (maybe a good lofty goal?)
  */
  merchant: String,
  category: String, // "Restaurants", "Gas & Fuel", "Entertainment" ...
  deliveryMethod: String, // "N" (normal), "Chase Pay", "Apple Pay", ...
  amount: Number
});

module.exports = mongoose.model("Transaction", transactionSchema);
