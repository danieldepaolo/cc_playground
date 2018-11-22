const express = require("express");
const router = express.Router();
      
const rewardCategories = require("../constants/rewardCategories");

// OTHER

router.get('/rewardcategories', (req, res) => {
  const sortedProductCategories = rewardCategories.product.sort( (a,b) => {
    return +(a.label > b.label) || -(a.label < b.label);
  });

  res.json({
    delivery: rewardCategories.delivery,
    product: sortedProductCategories
  });
});

// ROOT route
router.get("/", (req, res) => {
  res.redirect("/playground");
});

module.exports = router;
