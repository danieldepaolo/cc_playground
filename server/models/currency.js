const mongoose = require("mongoose"),
      uniqueValidator = require("mongoose-unique-validator");

const currencySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  description: String,
  // value in cents. Value if user is not logged in. Otherwise user's value (if specified)
  defaultValue: {type: Number, required: true}
});

currencySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Currency", currencySchema);
