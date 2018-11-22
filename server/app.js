const express        = require('express'),
      cookieParser   = require('cookie-parser'),
      bodyParser     = require('body-parser'),
      morgan         = require('morgan'),
      mongoose       = require('mongoose'),
      cors           = require('cors'),
      passport       = require('passport');

// Set up passport.js
require('./passportSetup');

// Route files
const indexRoutes         = require('./routes'),
      authRoutes          = require('./routes/auth'),
      cardRoutes          = require("./routes/cards"),
      currencyRoutes      = require("./routes/currencies"),
      perkRoutes          = require("./routes/perks"),
      playgroundRoutes    = require("./routes/playground"),
      transactionsRoutes  = require("./routes/transactions");

mongoose.connect("mongodb://localhost/cc_playground", { useNewUrlParser: true });

/* Setup our app */
const app = express();
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

/* Routes */
app.use(indexRoutes);
app.use(authRoutes);
app.use(cardRoutes);
app.use(currencyRoutes);
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
