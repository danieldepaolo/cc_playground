const express        = require('express'),
      cookieParser   = require('cookie-parser'),
      bodyParser     = require('body-parser'),
      session        = require('express-session'),
      morgan         = require('morgan'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      methodOverride = require('method-override'),
      cors           = require('cors');

/* Setup our app */
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cors());

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
  res.json({
    message: "Reached transactions index route"
  });
});

// get a particular transaction
app.get("/transactions/:id", (req, res) => {
  res.json({
    message: "Reached transactions show route"
  });
});

// add transaction(s) to database
app.post("/transactions", (req, res) => {
  res.json({
    message: "Reached transactions create route"
  });
});

// modify a particular transaction
app.put("/transactions/:id", (req, res) => {
  res.json({
    message: "Reached transactions update route"
  });
});

// delete a transaction
app.put("/transactions/:id", (req, res) => {
  res.json({
    message: "Reached transactions destroy route"
  });
});

//// Cards ////

// get all cards
app.get("/cards", (req, res) => {
  res.json({
    message: "Reached Cards index route"
  });
});

// get one card by id
app.get("/cards/:id", (req, res) => {
  res.json({
    message: "Reached Cards show route"
  });
});

// add a new card to database
app.post("/cards", (req, res) => {
  res.json({
    message: "Reached Cards create route"
  });
});

// modify a particular card in database
app.put("/cards/:id", (req, res) => {
  res.json({
    message: "Reached Cards update route"
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
