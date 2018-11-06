import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'react-table/react-table.css'
import './Styles/App.css';

import {
  pNewCard,
  pShowCard,
  pEditCard,
  pNewCurrency,
  pCurrencies,
  pNewPerk,
  pPerks,
  pLogin,
  pRegister,
  pTransactions
} from './constants';

import Navigation from './Components/Navigation';
import Playground from './Components/Playground';
import Transactions from './Components/Transactions';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import CardNewForm from './Components/CardForm/CardNewForm';
import CardEditForm from './Components/CardForm/CardEditForm';
import PerkForm from './Components/Perks/PerkForm';
import Perks from './Components/Perks';
import CurrencyForm from './Components/Currencies/CurrencyForm';
import Currencies from './Components/Currencies';
import ShowCard from './Components/Cards/show';

// $TODO
// 1. Create components for perks/edit and currencies/edit

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <div id="mainArea">
            <Switch>
              <Route exact path="/" component={Playground} />
              <Route path={pNewPerk} component={PerkForm} />
              <Route path={pPerks} component={Perks} />
              <Route path={pNewCurrency} component={CurrencyForm} />
              <Route path={pCurrencies} component={Currencies} />
              <Route path={pTransactions} component={Transactions} />
              <Route path={pNewCard} component={CardNewForm} />
              <Route
                path={pEditCard}
                render={props => <CardEditForm {...props} />}
              />
              <Route path={pShowCard} component={ShowCard} />
              <Route path={pLogin} component={Login} />
              <Route path={pRegister} component={Register} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
