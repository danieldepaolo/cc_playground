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

router.get("/perks/:id", (req, res) => {
  const { id } = req.params;

  Perk.findById(id, (err, foundPerk) => {
    res.json({
      message: err ? err : "Retrieved card!",
      perk: foundPerk
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

router.put("/perks/:id", (req, res) => {
  const { id } = req.params;
  const { perk } = req.body;

  Perk.replaceOne({_id: id}, perk, (err, updatedPerk) => {
    res.json({
      message: err ? err : "Updated card!",
      card: updatedPerk
    });
  });
});

router.delete("/perks/:id", (req, res) => {
  const { id } = req.params;

  Perk.deleteOne({_id: id}, err => {
    res.json({
      message: err ? err : "Successfully deleted perk!"
    });
  });
});

module.exports = router;
