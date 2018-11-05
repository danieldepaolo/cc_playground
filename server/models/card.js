const mongoose = require("mongoose"),
      uniqueValidator = require("mongoose-unique-validator");

const cardSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  processor: {type: String, required: true}, // Mastercard, Visa, ...
  imageUrl: String,
  defaultReturn: {type: Number, required: true}, // Generally 1-3 cents/points/miles per $
  rewardCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: true
  },
  fees: {
    annual: {type: Number, required: true},
    foreign: Boolean, // charges foreign transaction fees or not?
    waivedFirstYear: Boolean // Common for cards to waive their annual fee in first year
  },
  bonusReward: { // Information relating to getting more value than default
    categories: {
      merchant: [{
        name: String,
        bonusReturn: Number
      }],
      product: [{
        name: String,
        bonusReturn: Number
      }],
      delivery: [{
        name: String, // Chase Pay, Apple Pay, etc.
        bonusReturn: Number
      }]
    },
    signup: {
      months: Number, // # of months to reach min spend
      minSpend: Number, // Current min spend requirement
      amount: Number, // Current signup bonus
    },
    special: [{
      // Describes the requirement for earning this special bonus
      requirement: {
        period: String, // Annual, Monthly
        unit: String, // transactions, spend
        amount: Number
      },
      currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency"
      },
      amount: Number
    }]
  },
  perks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Perk"
  }]
});

cardSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Card", cardSchema);
