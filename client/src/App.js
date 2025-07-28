import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'react-table/react-table.css'
import 'filepond/dist/filepond.min.css';
import './styles/App.scss';

import {
  pNewCard,
  pShowCard,
  pEditCard,
  pNewNonAcceptMerchant,
  pEditNonAcceptMerchant,
  pNonAcceptMerchants,
  pNewCurrency,
  pEditCurrency,
  pCurrencies,
  pNewPerk,
  pEditPerk,
  pPerks,
  pLogin,
  pLogout,
  pRegister,
  pTransactions,
  pPlayground
} from './constants';

import AuthRoute from './Components/AuthRoute';
import { loggedIn } from './AuthService';

import Navigation from './Components/Navigation';
import Playground from './Components/Playground';
import Transactions from './Components/Transactions';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Logout from './Components/User/Logout';
import MerchantNonAccept from './Components/MerchantNonAccept';
import MerchantNewForm from './Components/MerchantNonAccept/MerchantNewForm';
import CardNewForm from './Components/CardForm/CardNewForm';
import CardEditForm from './Components/CardForm/CardEditForm';
import PerkNewForm from './Components/Perks/PerkNewForm';
import PerkEditForm from './Components/Perks/PerkEditForm';
import Perks from './Components/Perks';
import CurrencyNewForm from './Components/Currencies/NewForm';
import CurrencyEditForm from './Components/Currencies/EditForm';
import Currencies from './Components/Currencies';
import ShowCard from './Components/Cards/show';
import LandingPage from './Components/LandingPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: loggedIn()
    };
  }

  updateLoggedIn = () => {
    this.setState({loggedIn: loggedIn()});
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Navigation 
            userStatus={loggedIn ? 'loggedIn' : 'loggedOut'}
            onLogout={this.updateLoggedIn}
          />
          <div id="mainArea">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <AuthRoute path='/nonacceptmerchants' component={MerchantNonAccept} />
              <AuthRoute path={pNewNonAcceptMerchant} component={MerchantNewForm} />
              <AuthRoute path={pPlayground} component={Playground} />
              <AuthRoute path={pNewPerk} component={PerkNewForm} />
              <AuthRoute path={pEditPerk} component={PerkEditForm} />
              <Route 
                path={pPerks} 
                render={props =>
                  <Perks
                    loggedIn={loggedIn}
                    {...props}
                  />
                } 
              />
              <AuthRoute path={pNewCurrency} component={CurrencyNewForm} />
              <AuthRoute path={pEditCurrency} component={CurrencyEditForm} />
              <Route 
                path={pCurrencies} 
                render={props =>
                  <Currencies
                    loggedIn={loggedIn}
                    {...props}
                  />
                } 
              />
              <AuthRoute path={pTransactions} component={Transactions} />
              <AuthRoute path={pNewCard} component={CardNewForm} />
              <AuthRoute path={pEditCard} component={CardEditForm} />
              <Route 
                path={pShowCard} 
                render={props =>
                  <ShowCard
                    loggedIn={loggedIn}
                    {...props}
                  />
                } 
              />
              <Route
                path={pLogin}
                render={props => 
                  <Login
                    onLogin={this.updateLoggedIn}
                    {...props}
                  />
                }
              />
              <Route path={pRegister} component={Register} />
              <Route
                path={pLogout}
                render={props => 
                  <Logout
                    onLogout={this.updateLoggedIn}
                    {...props}
                  />
                }
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
