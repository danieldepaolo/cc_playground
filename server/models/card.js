const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  issuer: String, // Chase, Citi, Bank Of America, ...
  processor: String, // Mastercard, Visa, ...
  name: String,
  defaultReturn: Number, // Generally 1-3 cents/points/miles per $
  rewardCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency"
  },
  fees: {
    annual: Number,
    waivedFirstYear: Boolean // Common for cards to waive their annual fee in first year
  },
  bonusReward: { // Information relating to getting more value than default
    merchant: [{
      info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Merchant"
      },
      bonusReturn: Number
    }],
    product: [{
      category: String,
      bonusReturn: Number
    }],
    deliveryMethod: [{
      type: String,
      bonusReturn: Number
    }],
    special: [{
      period: String, // Annual, Monthly
      type: String,
      threshold: Number,
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
