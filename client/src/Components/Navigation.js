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
    const { userStatus } = this.props;

    return (
      <Menu>
        <Menu.Header>
          <Link 
            to="/"
            className="navLink"
          >
            CC Playground
          </Link>
        </Menu.Header>
        <Menu.Menu position='left'>
          {navItems[userStatus].left.map(item => (
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
          {navItems[userStatus].right.map(item => (
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
