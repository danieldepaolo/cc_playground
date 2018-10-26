const rewardCategories = {
  product: new Set([
    // Food/Dining
    "Restaurants",
    "Groceries",
    "Coffee Shops",

    // Travel category
    "Travel",
    "Air Travel",
    "Hotel",
    "Vacation Rental",
    "Rental Car & Taxi",
    "Public Transportation",
    "Parking",
    "Cruise", // New Citi Prestige has this category (End 2018)

    // Entertainment category
    "Entertainment",
    "Movies & DVDs",
    "Music",
    "Arts",

    // Health/Services
    "Gym",
    "Pharmacy",
    "Home Phone",
    "Mobile Phone",
    "Internet",
    "Television",

    // Other
    "Gas & Fuel",
    "Department Stores"
  ]),
  delivery: [
    "Apple Pay",
    "Samsung Pay",
    "Google Pay",
    "Chase Pay"
  ]
};

module.exports = rewardCategories;
