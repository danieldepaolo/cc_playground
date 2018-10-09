const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  name: String,
  description: String,
  // value in cents. Value if user is not logged in. Otherwise user's value (if specified)
  defaultValue: Number
});

module.exports = mongoose.model("Currency", currencySchema);
