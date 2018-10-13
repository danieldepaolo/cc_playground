const mongoose = require("mongoose");
passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Whether or not use wants to use their own perk/currency values or default
  useDefaultValues: Boolean,
  
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

module.exports = mongoose.model("User", userSchema);
