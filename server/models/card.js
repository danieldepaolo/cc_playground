const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  issuer: String, // Chase, Citi, Bank Of America, ...
  processor: String, // Mastercard, Visa, ...
  name: String,
  image: Buffer,
  defaultReturn: Number, // Generally 1-3 cents/points/miles per $
  rewardCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency"
  },
  fees: {
    annual: Number,
    foreign: Boolean, // charges foreign transaction fees or not?
    waivedFirstYear: Boolean // Common for cards to waive their annual fee in first year
  },
  bonusReward: { // Information relating to getting more value than default
    merchant: [{
      name: String,
      bonusReturn: Number
    }],
    product: [{
      category: String,
      bonusReturn: Number
    }],
    delivery: [{
      method: String, // Chase Pay, Apple Pay, etc.
      bonusReturn: Number
    }],
    signup: {
      currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency"
      },
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

module.exports = mongoose.model("Card", cardSchema);
