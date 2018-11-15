const express = require("express");
const router = express.Router();

const Currency = require("../models/currency");

router.get("/currencies", (req, res) => {
  Currency.find({}, (err, allCurrencies) => {
    res.json({
      err: err || null,
      message: err ? "Could not find currency" : "Successfully found currency",
      currencies: allCurrencies
    });
  });
});

router.get("/currencies/:id", (req, res) => {
  const { id } = req.params;

  Currency.findById(id, (err, foundCurrency) => {
    res.json({
      message: err ? err : "Retrieved currency!",
      currency: foundCurrency
    });
  });
});

router.post("/currencies", (req, res) => {
  const { currency } = req.body;

  Currency.create(currency, (err, newCurrency) => {
    res.json({
      currency: newCurrency,
      message: err ? "Error creating currency" : "Successfully added currency",
      err: err || null
    });
  });
});

router.put("/currencies/:id", (req, res) => {
  const { id } = req.params;
  const { currency } = req.body;

  Currency.replaceOne({_id: id}, currency, (err, updatedCurrency) => {
    res.json({
      message: err ? err : "Updated currency!",
      currency: updatedCurrency
    });
  });
});

router.delete("/currencies/:id", (req, res) => {
  const { id } = req.params;

  Currency.deleteOne({_id: id}, err => {
    res.json({
      message: err ? err : "Successfully deleted currency!"
    });
  });
});

module.exports = router;
