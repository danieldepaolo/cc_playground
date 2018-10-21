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
import CurrencyForm from './Components/Forms/CurrencyForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardPerks: [],
      currencies: []
    };
  }

  componentDidMount = async () => {
    let response = await fetch("http://localhost:8080/perks");
    let perkData = await response.json();

    response = await fetch("http://localhost:8080/currencies");
    const currencyData = await response.json();

    this.setState({
      cardPerks: perkData.perks,
      currencies: currencyData.currencies
    });
  }

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
              <Route path="/currencies/edit" component={TestArea} />
              <Route path="/currencies/new" component={CurrencyForm} />
              <Route path="/transactions" component={Transactions} />
              <Route 
                path="/cards/new" 
                render={() => <CardForm perks={this.state.cardPerks} currencies={this.state.currencies} />} 
              />
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
