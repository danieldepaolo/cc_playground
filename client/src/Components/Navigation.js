import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const items = {
  loggedIn: {
    left: [
      {name: "Playground", path: "/"},
      {name: "Transactions", path: "/transactions"}
    ],
    right: [
      {name: "Perk Values", path: "/perks/edit"},
      {name: "Currency Values", path: "/currency/edit"},
      {name: "Logout", path: "/"}
    ]
  },
  loggedOut: {
    left: [
      {name: "Playground", path: "/"},
      {name: "Transactions", path: "/transactions"}
    ],
    right: [
      {name: "Add Card", path: "/cards/new"},
      {name: "Add Perk", path: "/perks/new"},
      {name: "Login", path: "/login"},
      {name: "Register", path: "/register"}
    ]
  }
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Menu>
        <Menu.Header>
          <Link to="/">CC Playground</Link>
        </Menu.Header>
        <Menu.Menu position='left'>
          {items.loggedOut.left.map(item => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="navLink"
            >
              {item.name}
            </Link>
          ))}
        </Menu.Menu>
        <Menu.Menu position='right'>
          {items.loggedOut.right.map(item => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="navLink"
            >
              {item.name}
            </Link>
          ))}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navigation;
