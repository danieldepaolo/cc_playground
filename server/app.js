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
      perkRoutes          = require("./routes/perks"),
      playgroundRoutes    = require("./routes/playground"),
      transactionsRoutes  = require("./routes/transactions");

mongoose.connect("mongodb://localhost/cc_playground", { useNewUrlParser: true });

/* Setup our app */
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
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

/* Routes */
app.use(cardRoutes);
app.use(perkRoutes);
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
