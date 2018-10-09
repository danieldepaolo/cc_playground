const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  name: String,
  transactionNames: [String], // Possible names for transaction "merchant" field
  creditAccepted: Boolean,
  excludedProcessors: [String] // Common for this to be American Express or Discover!
});

module.exports = mongoose.model("Merchant", merchantSchema);
