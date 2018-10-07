import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const items = [
  {name: "Settings", path: "/settings"}, 
  {name: "Playground", path: "/playground"},
  {name: "Register", path: "/register"}
];

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">CC Playground</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {items.map(item => (
          <Link 
            key={item.name} 
            to={item.path} 
            className="navLink"
          >
            {item.name}
          </Link>
        ))}
      </Navbar>
    );
  }
}

export default Navigation;
