import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { navItems } from '../constants';

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
          {navItems.loggedOut.left.map(item => (
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
          {navItems.loggedOut.right.map(item => (
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
