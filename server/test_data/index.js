// test transactions
// Until we have a database this is easy
let testTransactions = [{
  id: 0,
  date: new Date(),
  description: "Costco Richmond",
  merchant: "Costco",
  productType: "Groceries",
  deliveryType: "Normal",
  amount: 106.78
}, {
  id: 1,
  date: new Date(),
  description: "Best Place In Town",
  merchant: "Peet's Coffee",
  productType: "Coffee Shops",
  deliveryType: "Normal",
  amount: 4.69
}];

/* Stupid test data that will later be replaced with database */

let testCards = [{
  id: 0,
  issuer: "Chase",
  name: "Freedom",
  defaultReturn: 1,
  ptValue: 1,
  fees: {
    annual: 0,
    waivedFirstYear: "no"
  },
  bonus: {
    categories: {},
    special: []
  },
  perks: []
}, {
  id: 1,
  issuer: "Citibank",
  name: "AAdvantage Platinum Plus",
  defaultReturn: 1,
  ptValue: 1.2,
  fees: {
    annual: 99,
    waivedFirstYear: "yes"
  },
  bonus: {
    categories: {
      merchant: [{
        name: "American Airlines",
        idStrings: ["American", "American Airlines"],
        bonus: 2
      }],
      product: [{
        type: "Restaurants",
        bonus: 2
      }, {
        type: "Gas & Fuel",
        bonus: 2
      }]
    },
    special: [{
      period: "annual",
      type: "spend",
      threshold: 25000,
      rewardCurrency: "credit",
      rewardAmt: 100
    }]
  },
  perks: [{
    name: "Free first checked bag",
    description: "Free first checked bag on domestic AA flights",
    value: 85
  }, {
    name: "Priority Boarding",
    description: "Priority Boarding on AA flights",
    value: 85
  }]
}];

module.exports = {
  testTransactions: testTransactions,
  testCards: testCards
};