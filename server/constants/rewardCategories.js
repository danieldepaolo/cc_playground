// Font Awesome icons

const rewardCategories = [
    // Food/Dining
    { categoryType: 'product', name: "Restaurants" },
    { categoryType: 'product', name: "Groceries" },
    { categoryType: 'product', name: "Coffee Shops" },

    // Travel category
    { categoryType: 'product', name: "Travel" },
    { categoryType: 'product', name: "Air Travel" },
    { categoryType: 'product', name: "Hotel" },
    { categoryType: 'product', name: "Vacation Rental" },
    { categoryType: 'product', name: "Rental Car & Taxi" },
    { categoryType: 'product', name: "Public Transportation" },
    { categoryType: 'product', name: "Parking" },
    { categoryType: 'product', name: "Cruise" }, // New Citi Prestige has this category (2018)

    // Entertainment category
    { categoryType: 'product', name: "Entertainment" },
    { categoryType: 'product', name: "Movies & DVDs" },
    { categoryType: 'product', name: "Music" },
    { categoryType: 'product', name: "Arts" },

    // Health/Services
    { categoryType: 'product', name: "Gym" },
    { categoryType: 'product', name: "Pharmacy" },
    { categoryType: 'product', name: "Home Phone" },
    { categoryType: 'product', name: "Mobile Phone" },
    { categoryType: 'product', name: "Internet" },
    { categoryType: 'product', name: "Television" },

    // Other
    { categoryType: 'product', name: "Gas & Fuel" },
    { categoryType: 'product', name: "Department Stores" },
    { categoryType: 'delivery', name: "Apple Pay" },
    { categoryType: 'delivery', name: "Samsung Pay" },
    { categoryType: 'delivery', name: "Google Pay" },
    { categoryType: 'delivery', name: "Chase Pay" }
];

const categoryAltNamesMap = {
  Restaurants: ['Restaurant', 'Restaurants & Bars'],
  Groceries: ['Grocery Store', 'Grocery Stores'],
  Travel: ['Travel & Vacation'],
  Entertainment: ['Entertainment & Recreation']
}

module.exports = {
  rewardCategories,
  categoryAltNamesMap
};
