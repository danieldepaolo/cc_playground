const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: String,
  email: {type: String, required: true, unique: true},
  password: String,
  // Whether or not use wants to use their own perk/currency values or default
  useDefaultValues: {type: Boolean, default: true},
  
  // User's favorite cards!
  favoriteCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card"
  }],

  // User-specific values for perks and currencies
  perkValues: [{
    perk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perk"
    },
    value: Number
  }],
  currencyValues: [{
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Currency"
    },
    value: Number
  }]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
