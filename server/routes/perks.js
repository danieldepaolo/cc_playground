const express = require("express");
const router = express.Router();

const passport = require("passport");

const Perk = require("../models/perk");

// get all perks
router.get("/perks", async (req, res) => {
  let allPerks = [],
    err = null;

  try {
    allPerks = await Perk.find({});
  } catch (error) {
    err = error;
  } finally {
    res.json({
      err,
      perks: allPerks,
    });
  }
});

router.get("/perks/:id", async (req, res) => {
  const { id } = req.params;

  let foundPerk, err;

  try {
    foundPerk = await Perk.findById(id);
  } catch (error) {
    err = error;
  } finally {
    res.json({
      message: err || "Retrieved card!",
      perk: foundPerk,
    });
  }
});

router.post(
  "/perks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { perk } = req.body;

    let newPerk;
    let responseMsg = "Successfully added perk";
    let responseErr = null;

    try {
      newPerk = await Perk.create(perk);
    } catch (err) {
      responseMsg = "Error creating perk";
      responseErr = err;
    } finally {
      res.json({
        perk: newPerk,
        message: responseMsg,
        err: responseErr,
      });
    }
  }
);

router.put(
  "/perks/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { perk } = req.body;

    let updatedPerk, err;

    try {
      updatedPerk = await Perk.replaceOne({ _id: id }, perk);
    } catch (error) {
      err = error;
    } finally {
      res.json({
        message: err || "Updated card!",
        perk: updatedPerk,
      });
    }
  }
);

router.delete(
  "/perks/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    let err;

    try {
      await Perk.deleteOne({ _id: id });
    } catch (error) {
      err = error;
    } finally {
      res.json({
        message: err || "Successfully deleted perk!",
      });
    }
  }
);

module.exports = router;
