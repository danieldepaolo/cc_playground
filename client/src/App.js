import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'react-table/react-table.css'
import './Styles/App.css';

import Navigation from './Components/Navigation';
import Playground from './Components/Playground';
import Transactions from './Components/Transactions';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import CardNewForm from './Components/CardForm/CardNewForm';
import CardEditForm from './Components/CardForm/CardEditForm';
import PerkForm from './Components/Forms/PerkForm';
import CurrencyForm from './Components/Forms/CurrencyForm';
import ShowCard from './Components/Cards/ShowCard';

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
              <Route path="/perks/new" component={PerkForm} />
              <Route path="/perks/edit" component={Playground} />
              <Route path="/currencies/edit" component={Playground} />
              <Route path="/currencies/new" component={CurrencyForm} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/cards/new" component={CardNewForm} />
              <Route
                path="/cards/:id/edit"
                render={props => <CardEditForm {...props} />}
              />
              <Route path="/cards/:id" component={ShowCard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
