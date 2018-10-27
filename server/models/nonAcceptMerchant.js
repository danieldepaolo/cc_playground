const mongoose = require("mongoose"),
      uniqueValidator = require("mongoose-unique-validator");

// We only care to store data about merchants that don't accept credit
// Or that only accept Visa/MC for example
const nonAcceptMerchantSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  otherNames: [String], // Possible names for transaction "merchant" field (if different than "name")
  creditAccepted: {type: Boolean, required: true},
  processorAcceptance: {
      amex: {type: Boolean, required: true},
      discover: {type: Boolean, required: true},
      visa: {type: Boolean, required: true},
      mc: {type: Boolean, required: true}
  }
});

nonAcceptMerchantSchema.plugin(uniqueValidator);

module.exports = mongoose.model("NonAcceptMerchant", nonAcceptMerchantSchema);
