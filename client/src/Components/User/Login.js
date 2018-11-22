import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

import { setToken } from '../../AuthService';

// props
// onLogin: func(token_key)
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null
    };
  }

  handleFormSubmit = async () => {
    const { username, password } = this.state;

    try {
      var response = await axios.post('/login', {
        username: username,
        password: password
      });
      console.log(response);
    } catch (err) {
      this.setState({error: "Failed to communicate with server"});
    }
    
    if (response.data.success) {
      setToken(response.data.token);
      this.props.onLogin();
    } else {
      this.setState({error: response.error});
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { username, password } = this.state;

    return (
      <div className="formBox">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input
            label="Username"
            name='username'
            value={username}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            name='password'
            value={password}
            type='password'
            placeholder="Password"
            onChange={this.handleChange}
          />
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
