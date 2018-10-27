const mongoose = require("mongoose"),
      uniqueValidator = require("mongoose-unique-validator");

const perkSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  description: String,
  // value in cents. Value if user is not logged in. Otherwise user's value (if specified)
  defaultValue: {type: Number, required: true}
});

perkSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Perk", perkSchema);
