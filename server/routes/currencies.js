const express = require("express");
const router = express.Router();

const Currency = require("../models/currency");

router.get("/currencies", (req, res) => {
  let responseErr = null;

  Currency.find({}, (err, allCurrencies) => {
    if (err) {
      responseErr = err;
    }

    res.json({
      err: responseErr,
      currencies: allCurrencies
    });
  });
});

router.post("/currencies", (req, res) => {
  const { currency } = req.body;

  let responseMsg = "Successfully added currency";
  let responseErr = null;

  Currency.create(currency, (err, newCurrency) => {
    if (err) {
      responseMsg = "Error creating currency";
      responseErr = err;
    }
    res.json({
      currency: newCurrency,
      message: responseMsg,
      err: responseErr
    });
  });
});

module.exports = router;
