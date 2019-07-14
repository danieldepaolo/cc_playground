const express = require("express");
const router = express.Router();

const passport = require('passport');

const NonAcceptMerchant = require("../models/nonAcceptMerchant");

// get all nonacceptmerchants
router.get("/nonacceptmerchants", (req, res) => {
  let responseErr = null;

  NonAcceptMerchant.find({}, (err, allNonAcceptMerchants) => {
    if (err) {
      responseErr = err;
    }

    res.json({
      err: responseErr,
      nonAcceptMerchants: allNonAcceptMerchants
    });
  });
});

router.get("/nonacceptmerchants/:id", (req, res) => {
  const { id } = req.params;

  NonAcceptMerchant.findById(id, (err, foundNonAcceptMerchant) => {
    res.json({
      message: err ? err : "Retrieved merchant!",
      nonAcceptMerchant: foundNonAcceptMerchant
    });
  });
});

router.post("/nonacceptmerchants", passport.authenticate('jwt', {session: false}), (req, res) => {
  const { nonAcceptMerchant } = req.body;

  let responseMsg = "Successfully added merchant";
  let responseErr = null;

  NonAcceptMerchant.create(nonAcceptMerchant, (err, newNonAcceptMerchant) => {
    if (err) {
      responseMsg = "Error creating merchant";
      responseErr = err;
    }
    res.json({
      nonAcceptMerchant: newNonAcceptMerchant,
      message: responseMsg,
      err: responseErr
    });
  });
});

router.put("/nonacceptmerchants/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  const { id } = req.params;
  const { nonAcceptMerchant } = req.body;

  NonAcceptMerchant.replaceOne({_id: id}, nonAcceptMerchant, (err, updatedNonAcceptMerchant) => {
    res.json({
      message: err ? err : "Updated card!",
      nonAcceptMerchant: updatedNonAcceptMerchant
    });
  });
});

router.delete("/nonacceptmerchants/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  const { id } = req.params;

  NonAcceptMerchant.deleteOne({_id: id}, err => {
    res.json({
      message: err ? err : "Successfully deleted merchant!"
    });
  });
});

module.exports = router;
