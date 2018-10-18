const express        = require('express'),
      cookieParser   = require('cookie-parser'),
      bodyParser     = require('body-parser'),
      session        = require('express-session'),
      morgan         = require('morgan'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      localStrategy  = require("passport-local"),
      methodOverride = require('method-override'),
      cors           = require('cors'),
      _              = require('underscore');

const User = require('./models/user');

// Route files
const cardRoutes          = require("./routes/cards"),
      playgroundRoutes    = require("./routes/playground"),
      transactionsRoutes  = require("./routes/transactions");

/* Setup our app */
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cors());

// PASSPORT setup
app.use(session({
  secret: "Bountiful rewards await",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ROUTES */

app.get("/", (req, res) => {
  res.json({
    route: "/",
    routeName: "index"
  });
});

//// $TODO Merchants? ////
// This is used to track what merchants don't accept credit cards
// OR don't accept particular kinds of credit cards (Amex andDiscover for example)
// Do we want a model, or routes, or both, or neither for merchants?

// Start using our routes from external files
app.use(cardRoutes);
app.use(playgroundRoutes);
app.use(transactionsRoutes);

// Start listening on IP:PORT from env vars
// Default to localhost:8080
const serverInfo = {
  ip: process.env.IP || 'localhost',
  port: process.env.PORT || '8080'
};

app.listen(serverInfo.port, serverInfo.ip, () => {
  console.log(`CC Playground server is running on 
    ${serverInfo.ip}:${serverInfo.port}`);
});
