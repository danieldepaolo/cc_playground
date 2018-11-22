const mongoose        = require("mongoose"),
      uniqueValidator = require('mongoose-unique-validator'),
      bcrypt          = require('bcrypt');

const Transaction = require('./transaction');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, minlength: 5},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 5},
  
  // User's favorite cards!
  favoriteCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card"
  }],

  // User's transactions
  transactions: [Transaction],

  // Whether or not use wants to use their own perk/currency values or default
  useDefaultValues: {type: Boolean, default: true},

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

userSchema.methods.setPassword = function(password) {
  const user = this;
  user.password = bcrypt.hashSync(password, 8);
}

//We'll use this later on to make sure that the user trying to log in has the correct credentials
userSchema.methods.validPassword = function(password) {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the 
  //database matches the one sent. Returns true if it does else false.
  const compare = bcrypt.compareSync(password, user.password);
  return compare;
}

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
