const express = require("express"),
      passport = require("passport");

const router = express.Router();
      
const User = require("../models/user");
const rewardCategories = require("../constants/rewardCategories");

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

// OTHER

router.get('/rewardcategories', (req, res) => {
  const sortedProductCategories = Array.from(rewardCategories.product).sort();
  res.json({
    deliveryCategories: rewardCategories.delivery,
    productCategories: sortedProductCategories
  });
});

// ROOT route
router.get("/", (req, res) => {
  res.redirect("/playground");
});

module.exports = router;
