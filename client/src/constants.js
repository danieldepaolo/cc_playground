export const pNewCard = "/cards/new";
export const pShowCard = "/cards/:id";
export const pEditCard = "/cards/:id/edit";
export const pNewCurrency = "/currencies/new";
export const pNewPerk = "/perks/new";
export const pPerks = "/perks";
export const pCurrencies = "/currencies";
export const pLogin = "/login";
export const pRegister = "/register";
export const pTransactions = "/transactions";

export const navItems = {
  loggedIn: {
    left: [
      {name: "Playground", path: "/"},
      {name: "Transactions", path: pTransactions},
      {name: "Perks", path: pPerks},
      {name: "Currencies", path: pCurrencies}
    ],
    right: [
      {name: "Logout", path: "/"}
    ]
  },
  loggedOut: {
    left: [
      {name: "Playground", path: "/"},
      {name: "Transactions", path: pTransactions},
      {name: "Perks", path: pPerks},
      {name: "Currencies", path: pCurrencies}
    ],
    right: [
      {name: "Add Card", path: pNewCard},
      {name: "Add Perk", path: pNewPerk},
      {name: "Add Currency", path: pNewCurrency},
      {name: "Login", path: pLogin},
      {name: "Register", path: pRegister}
    ]
  }
};