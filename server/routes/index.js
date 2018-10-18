const express = require("express"),
      passport = require("passport");
      
const User = require("../models/user");
      
const router = express.Router();

// ROOT route
app.get("/", (req, res) => {
  res.redirect("/playground");
});

// AUTH routes
// ==============

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  
  var newUser = new User({
    username: username,
    email: email,
    useDefaultValues: true
  });

  User.register(newUser, password, (err) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    }
    passport.authenticate("local")(req, res, () => {
      res.json({
        success: true,
        username: req.user.username
      });
    });
  });
});

router.post('/login', passport.authenticate("local"), (req, res) => {
  res.json({
    success: true,
    username: req.user.username
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({success: true});
});

module.exports = router;
