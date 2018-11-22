const express = require("express");
const router = express.Router();

const passport       = require('passport'),
      jwt = require('jsonwebtoken');

const User = require("../models/user");

// AUTH routes
// ==============

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  
  const newUser = new User({
    username: username,
    email: email.toLowerCase(),
    useDefaultValues: true
  });

  // This function hashes the password
  newUser.setPassword(password);

  User.create(newUser, (err, createdUser) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        username: createdUser.username
      });
    }
  });
});

// 1. Check that user exists, if not return success false
// 2. If user exists, is the supplied password correct? If not return success false
// 3. If username and password are correct, return a JWT token back to the client
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({username: username}, (err, foundUser) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error while attempting to find user",
        error: err
      })
    } 
    if (!foundUser || !foundUser.validPassword(password)) {
      return res.json({
        success: false,
        message: "Incorrect username or password"
      });
    }
    
    const token = jwt.sign({id: foundUser.id}, 'Bountiful Rewards Await');
    res.json({
      success: true,
      token: token
    });
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({success: true});
});

module.exports = router;
