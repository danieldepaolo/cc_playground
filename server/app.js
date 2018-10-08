const express        = require('express'),
      cookieParser   = require('cookie-parser'),
      bodyParser     = require('body-parser'),
      session        = require('express-session'),
      morgan         = require('morgan'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      methodOverride = require('method-override'),
      cors           = require('cors'),
      _              = require('underscore');

const calc = require('./calculations');

/* Setup our app */
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cors());

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
        category: "American Airlines",
        bonus: 2
      }],
      product: [{
        category: "Restaurants",
        bonus: 2
      }, {
        category: "Gas & Fuel",
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

/* ROUTES */

app.get("/", (req, res) => {
  res.json({
    route: "/",
    routeName: "index"
  });
});

// Used to calculate the bonus value
// Response has overall bonus and FUTURE FEATURE bonus per transaction
// $TODO FUTURE: Plus card used for each transaction to get that bonus
/*
  {
    overallBonus: x,
    transactions: [{
      id: =transaction id=,
      cardUsed: =card id=,
      bonus: y
    }]
  }
*/
app.get("/playground/calcbonus", (req, res) => {
  // get cards from the query string
  const { card_id } = req.query;
  let cards = [];
  if (card_id) {
    if (Array.isArray(card_id)) {
      cards = card_id.map(cardId => testCards[cardId]);
    } else {
      cards.push(testCards[card_id]);
    }
  }

  const bonus = calc.getBonusWithCards(cards, testTransactions);
  res.json({
    bonus: bonus
  });
});

// Transactions //
 
// GET all transactions
app.get("/transactions", (req, res) => {
  res.json(testTransactions);
});

// get a particular transaction
app.get("/transactions/:id", (req, res) => {
  res.json(_.findWhere(testTransactions, {id: req.params.id}));
});

// add transaction(s) to database
app.post("/transactions", (req, res) => {
  let { transaction } = req.body; // shorthand for if we send via form with special names
  transaction.id = testTransactions.length;
  testTransactions.push(transaction);

  res.json({
    message: "Successfully added transaction!"
  });
});

// modify a particular transaction
app.put("/transactions/:id", (req, res) => {
  const { transaction } = req.body; // shorthand for if we send via form with special names
  testTransactions[transaction.id] = transaction;

  res.json({
    message: "Successfully modified transaction!"
  });
});

// delete a transaction
app.delete("/transactions/:id", (req, res) => {
  res.json({
    message: "Reached transactions destroy route"
  });
});

//// Cards ////

// Types of annual bonus:
// 1. Reaching spend threshold
// 2. Reaching points threshold
// 3. Anniversary gift

// Types of reward currency:
// 1. credit ($)
// 2. points

// $TODO perks will be their own model and referenced in card

// get all cards
app.get("/cards", (req, res) => {
  res.json(testCards);
});

// get one card by id
app.get("/cards/:id", (req, res) => {
  res.json(_.findWhere(testCards, {id: req.params.id}));
});

// add a new card to database
app.post("/cards", (req, res) => {
  const { card } = req.body;
  card.id = testCards.length;
  testCards.push(card);

  res.json({
    message: `Successfully added: ${card.name}!`
  });
});

// modify a particular card in database
app.put("/cards/:id", (req, res) => {
  const { card } = req.body; // shorthand for if we send via form with special names
  testCards[card.id] = card;

  res.json({
    message: "Successfully modified card!"
  });
});

// delete one card
app.delete("/cards/:id", (req, res) => {
  res.json({
    message: "Reached Cards destroy route"
  });
});

//// Merchants ////
// This is used to track what merchants don't accept credit cards
// OR don't accept particular kinds of credit cards (Amex andDiscover for example)


app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`CC Playground server is running on 
    ${process.env.IP}:${process.env.PORT}`);
});
