import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'react-table/react-table.css'
import './Styles/App.css';

import TestArea from './Components/TestArea';
import Navigation from './Components/Navigation';
import Playground from './Components/Playground';
import Transactions from './Components/Transactions';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import CardForm from './Components/Forms/CardForm';
import PerkForm from './Components/Forms/PerkForm';

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
              <Route path="/perks/edit" component={TestArea} />
              <Route path="/currency/edit" component={TestArea} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/cards/new" component={CardForm} />
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
