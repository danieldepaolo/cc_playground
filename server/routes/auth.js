const express = require("express");
const router = express.Router();

const passport       = require('passport'),
      jwt = require('jsonwebtoken');

const User = require("../models/user");

// AUTH routes
// ==============

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  const newUser = new User({
    username: username,
    email: email.toLowerCase(),
    useDefaultValues: true
  });

  // This function hashes the password
  newUser.setPassword(password);

  try {
    const createdUser = await User.create(newUser);

    res.json({
      success: true,
      username: createdUser.username
    });
  } catch (err) {
    res.json({
      success: false,
      error: err
    });
  }
});

// 1. Check that user exists, if not return success false
// 2. If user exists, is the supplied password correct? If not return success false
// 3. If username and password are correct, return a JWT token back to the client
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let user;

  try {
    user = await User.findOne({username: username});

    if (!user || !user.validPassword(password)) {
      return res.json({
        success: false,
        message: "Incorrect username or password"
      });
    }

    const token = jwt.sign({id: user.id}, 'Bountiful Rewards Await');

    res.json({
      success: true,
      token: token
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Error while attempting to find user",
      error: err
    })
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({success: true});
});

module.exports = router;
