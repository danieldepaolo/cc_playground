const express        = require('express'),
      cookieParser   = require('cookie-parser'),
      bodyParser     = require('body-parser'),
      session        = require('express-session'),
      morgan         = require('morgan'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      methodOverride = require('method-override');

/* Setup our app */
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

/* ROUTES */

app.get("/", (req, res) => {
  res.json({
    route: "/",
    routeName: "index"
  });
});

// Transactions //

// GET all transactions
app.get("/transactions", (req, res) => {
  
});

// get a particular transaction
// app.get("/transactions/:id", (req, res) => {
  
// });

// add transaction(s) to database
app.post("/transactions", (req, res) => {
  
});

// modify a particular transaction
app.put("/transactions/:id", (req, res) => {
  
});

// delete a transaction
app.put("/transactions/:id", (req, res) => {
  
});

//// Cards ////

// get all cards
app.get("/cards", (req, res) => {
  
});

// get one card by id
app.get("/cards/:id", (req, res) => {
  
});

// add a new card to database
app.post("/cards", (req, res) => {
  
});

// modify a particular card in database
app.put("/cards/:id", (req, res) => {
  
});

// delete one card
app.delete("/cards/:id", (req, res) => {
  
});

//// Merchants ////
// This is used to track what merchants don't accept credit cards
// OR don't accept particular kinds of credit cards (Amex andDiscover for example)



app.listen(process.env.PORT, process.env.IP, () => {
  console.log("CC Playground server is running...");
});
