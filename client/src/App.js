import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'react-table/react-table.css'
import './Styles/App.css';

import TestArea from './Components/TestArea';
import Navigation from './Components/Navigation';
import Playground from './Components/Playground';
import SettingsView from './Components/SettingsView';
import RegisterUser from './Components/RegisterUser';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <div id="mainArea">
            <Route path="/" component={TestArea} />
            <Route path="/settings" component={SettingsView} />
            <Route path="/playground" component={Playground} />
            <Route path="/register" component={RegisterUser} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
