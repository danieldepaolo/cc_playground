import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { logout } from '../../AuthService';

class Logout extends Component {
  componentDidMount = () => {
    logout();
    this.props.onLogout();
  }
  render() {
    return (
      <Container>
        <h4>You have been successfully logged out!</h4>
      </Container>
    );
  }
}

export default Logout;
