const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator");

const rewardCategorySchema = new mongoose.Schema({
  categoryType: { type: String, enum: ['product', 'merchant', 'delivery'], default: 'product', required: true },
  name: { type: String, required: true },
  bonusReturn: { type: Number, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
});

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  processor: { type: String, required: true }, // Mastercard, Visa, ...
  imageUrl: String,
  defaultReturn: { type: Number, required: true }, // Generally 1-3 cents/points/miles per $
  rewardCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: true,
  },

  // What user contributed this card?
  contributor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },

  fees: {
    annual: { type: Number, required: true },
    foreign: Boolean, // charges foreign transaction fees or not?
    waivedFirstYear: Boolean, // Common for cards to waive their annual fee in first year
  },
  bonusReward: {
    // Information relating to getting more value than default
    categories: [rewardCategorySchema],
    signup: {
      months: Number, // # of months to reach min spend
      minSpend: Number, // Current min spend requirement
      amount: Number, // Current signup bonus
    },
    special: [
      {
        // Describes the requirement for earning this special bonus
        // Examples:
        // - 30 transactions in a month (Amex Everyday Preferred)
        // - $xxx spent in a calendar year (Alaska Visa companion fare)
        requirement: {
          period: { type: String, enum: ['annual', 'monthly'] },
          unit: { type: String, enum: ['transactions', 'spend'] },
          amount: Number,
        },
        currency: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Currency",
        },
        bonus: Number,
      },
    ],
  },
  perks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perk",
    },
  ],
});

function categoriesHaveDuplicates(categories) {
  const categorySet = new Set();

  console.log('duplciate func: ', categories);

  for (const category of categories) {
    const key = `${category.categoryType}-${category.name}`;

    if (categorySet.has(key)) {
      return true;
    }

    categorySet.add(key);
  }

  return false;
}

//check for duplicates in reward categories
cardSchema.pre("save", function (next) {
  if (categoriesHaveDuplicates(this.bonusReward.categories)) {
    next(new Error('There are two reward categories with the same type and name.'));
  } else {
    next();
  }
});

cardSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Card", cardSchema);
