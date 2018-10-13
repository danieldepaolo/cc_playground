const mongoose = require("mongoose");

// We only care to store data about merchants that don't accept credit
// Or that only accept Visa/MC for example
const nonAcceptMerchantSchema = new mongoose.Schema({
  name: String,
  otherNames: [String], // Possible names for transaction "merchant" field (if different than "name")
  creditAccepted: Boolean,
  processorAcceptance = {
      amex: Boolean,
      discover: Boolean,
      visa: Boolean,
      mc: Boolean
  }
});

module.exports = mongoose.model("NonAcceptMerchant", nonAcceptMerchantSchema);
