const mongoose = require("mongoose");
passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
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
