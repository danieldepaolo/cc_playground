const express = require("express");
const router = express.Router();
      
const { rewardCategories } = require("../constants/rewardCategories");

// OTHER

router.get('/rewardcategories', (req, res) => {
  res.send(rewardCategories);
});

// ROOT route
router.get("/", (req, res) => {
  res.redirect("/playground");
});

module.exports = router;
