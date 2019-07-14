export const pNewCard = "/cards/new";
export const pShowCard = "/cards/:id";
export const pEditCard = "/cards/:id/edit";
export const pNewCurrency = "/currencies/new";
export const pEditCurrency = "/currencies/:id/edit";
export const pNewNonAcceptMerchant = "/nonacceptmerchants/new"
export const pEditNonAcceptMerchant = "/nonacceptmerchants/:id/edit"
export const pNonAcceptMerchants = "/nonacceptmerchants"
export const pNewPerk = "/perks/new";
export const pEditPerk = "/perks/:id/edit";
export const pPerks = "/perks";
export const pCurrencies = "/currencies";
export const pLogin = "/login";
export const pLogout = "/logout";
export const pRegister = "/register";
export const pTransactions = "/transactions";
export const pPlayground = "/playground";

export const navItems = {
  loggedIn: {
    left: [
      {name: "Playground", path: pPlayground},
      {name: "Transactions", path: pTransactions},
      {name: "Non-Accept Merchants", path: pNonAcceptMerchants},
      {name: "Perks", path: pPerks},
      {name: "Currencies", path: pCurrencies}
    ],
    right: [
      {name: "Add Card", path: pNewCard},
      {name: "Add Perk", path: pNewPerk},
      {name: "Add Currency", path: pNewCurrency},
      {name: "Add Non-Accept Merchant", path: pNewNonAcceptMerchant},
      {name: "Logout", path: pLogout}
    ]
  },
  loggedOut: {
    left: [
      {name: "Perks", path: pPerks},
      {name: "Currencies", path: pCurrencies},
      {name: "Non-Accept Merchants", path: pNonAcceptMerchants}
    ],
    right: [
      {name: "Login", path: pLogin},
      {name: "Register", path: pRegister}
    ]
  }
};