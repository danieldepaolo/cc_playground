export const pNewCard = "/cards/new";
export const pShowCard = "/cards/:id";
export const pEditCard = "/cards/:id/edit";
export const pNewCurrency = "/currencies/new";
export const pEditCurrency = "/currencies/:id/edit";
export const pNewPerk = "/perks/new";
export const pEditPerk = "/perks/:id/edit";
export const pPerks = "/perks";
export const pCurrencies = "/currencies";
export const pLogin = "/login";
export const pLogout = "/logout";
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
      {name: "Add Card", path: pNewCard},
      {name: "Add Perk", path: pNewPerk},
      {name: "Add Currency", path: pNewCurrency},
      {name: "Logout", path: pLogout}
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
      {name: "Login", path: pLogin},
      {name: "Register", path: pRegister}
    ]
  }
};