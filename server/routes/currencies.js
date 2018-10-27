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

module.exports = router;
