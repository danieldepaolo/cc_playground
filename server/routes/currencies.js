const express = require("express");
const router = express.Router();

const Currency = require("../models/currency");

router.get("/currencies", async (_, res) => {
  let currencies = [];
  let error = null;

  try {
    currencies = await Currency.find({});
  } catch (err) {
    error = err;
  } finally {
    res.json({
      err: error,
      message: error
        ? "Could not find currencies"
        : "Successfully found currencies",
      currencies,
    });
  }
});

router.get("/currencies/:id", async (req, res) => {
  const { id } = req.params;
  let currency;
  let err;

  try {
    currency = await Currency.findById(id);
  } catch (error) {
    err = error;
  } finally {
    res.json({
      message: err ? err : "Retrieved currency!",
      currency,
    });
  }
});

router.post("/currencies", async (req, res) => {
  const { currency } = req.body;

  let createdCurrency;
  let err;

  try {
    createdCurrency = await Currency.create(currency);
  } catch (error) {
    err = error;
  } finally {
    res.json({
      currency: createdCurrency,
      message: err ? "Error creating currency" : "Successfully added currency",
      err: err || null,
    });
  }
});

router.put("/currencies/:id", async (req, res) => {
  const { id } = req.params;
  const { currency } = req.body;

  let updatedCurrency;
  let err;

  try {
    updatedCurrency = await Currency.replaceOne({ _id: id }, currency);
  } catch (error) {
    err = error;
  } finally {
    res.json({
      message: err ? err : "Updated currency!",
      currency: updatedCurrency,
    });
  }
});

router.delete("/currencies/:id", async (req, res) => {
  const { id } = req.params;

  let err;

  try {
    await Currency.deleteOne({ _id: id });
  } catch (error) {
    err = error;
  } finally {
    res.json({
      message: err ? err : "Successfully deleted currency!",
    });
  }
});

module.exports = router;
