const express = require("express");
const router = express.Router();

const passport = require("passport");

const NonAcceptMerchant = require("../models/nonAcceptMerchant");

// get all nonacceptmerchants
router.get("/nonacceptmerchants", async (req, res) => {
  let allNonAcceptMerchants = [],
    responseErr = null;

  try {
    allNonAcceptMerchants = await NonAcceptMerchant.find({});
  } catch (err) {
    responseErr = err;
  } finally {
    res.json({
      error: responseErr,
      nonAcceptMerchants: allNonAcceptMerchants,
    });
  }
});

router.get("/nonacceptmerchants/:id", async (req, res) => {
  const { id } = req.params;

  let foundNonAcceptMerchant, error;

  try {
    foundNonAcceptMerchant = await NonAcceptMerchant.findById(id);
  } catch (err) {
    error = err;
  } finally {
    res.json({
      message: error || "Retrieved merchant!",
      nonAcceptMerchant: foundNonAcceptMerchant,
    });
  }
});

router.post(
  "/nonacceptmerchants",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { nonAcceptMerchant } = req.body;

    let newNonAcceptMerchant;
    let responseErr = null;

    try {
      newNonAcceptMerchant = await NonAcceptMerchant.create(nonAcceptMerchant);
    } catch (err) {
      responseErr = err;
    } finally {
      res.json({
        nonAcceptMerchant: newNonAcceptMerchant,
        message: responseErr
          ? "Error creating merchant"
          : "Successfully added merchant",
        err: responseErr,
      });
    }
  }
);

router.put(
  "/nonacceptmerchants/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { nonAcceptMerchant } = req.body;

    let updatedNonAcceptMerchant, error;

    try {
      updatedNonAcceptMerchant = await NonAcceptMerchant.replaceOne(
        { _id: id },
        nonAcceptMerchant
      );
    } catch (err) {
      error = err;
    } finally {
      res.json({
        message: error || "Updated card!",
        nonAcceptMerchant: updatedNonAcceptMerchant,
      });
    }
  }
);

router.delete(
  "/nonacceptmerchants/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    let error;

    try {
      await NonAcceptMerchant.deleteOne({ _id: id });
    } catch (err) {
      error = err;
    } finally {
      res.json({
        message: error || "Successfully deleted merchant!",
      });
    }
  }
);

module.exports = router;
