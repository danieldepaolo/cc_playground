const express = require("express");
const router = express.Router();

const Perk = require("../models/perk");

// get all perks
router.get("/perks", (req, res) => {
  let responseErr = null;

  Perk.find({}, (err, allPerks) => {
    if (err) {
      responseErr = err;
    }

    res.json({
      err: responseErr,
      perks: allPerks
    });
  });
});

router.post("/perks", (req, res) => {
  const { perk } = req.body;

  let responseMsg = "Successfully added perk";
  let responseErr = null;

  Perk.create(perk, (err, newPerk) => {
    if (err) {
      responseMsg = "Error creating perk";
      responseErr = err;
    }
    res.json({
      perk: newPerk,
      message: responseMsg,
      err: responseErr
    });
  });
});

module.exports = router;
