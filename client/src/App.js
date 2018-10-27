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
import CardNewForm from './Components/CardForm/CardNewForm';
import CardEditForm from './Components/CardForm/CardEditForm';
import PerkForm from './Components/Forms/PerkForm';
import CurrencyForm from './Components/Forms/CurrencyForm';
import ShowCard from './Components/Cards/ShowCard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardPerks: [],
      currencies: [],
      rewardCategories: {
        deliveryCategories: [],
        productCategories: []
      }
    };
  }

  componentDidMount = async () => {
    let response = await fetch("http://localhost:8080/perks");
    let perkData = await response.json();

    response = await fetch("http://localhost:8080/currencies");
    const currencyData = await response.json();

    response = await fetch("http://localhost:8080/rewardcategories");
    const categoryData = await response.json();

    this.setState({
      cardPerks: perkData.perks,
      currencies: currencyData.currencies,
      rewardCategories: categoryData
    });
  }

  render() {
    const { cardPerks, currencies, rewardCategories } = this.state;

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
                render={() => (
                  <CardNewForm
                    perks={cardPerks}
                    currencies={currencies}
                    categories={rewardCategories}
                  />
                )}
              />
              <Route
                path="/cards/:id/edit"
                render={props => (
                  <CardEditForm
                    {...props}
                    perks={cardPerks}
                    currencies={currencies}
                    categories={rewardCategories}
                  />
                )}
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
