import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      email: '',
      fieldErrors: [],
      requestError: null
    };
  }

  getPasswordValidationState () {
    const length = this.state.password.length;
    if (length === 0) {
      return null;
    }
    return length >= 6 && length <= 25
      ? 'success' : 'error';
  }

  async handleFormSubmit () {
    try {
      const response = await axios.post("/register", this.state);
      console.log(response);
      if (response.error) {
        this.setState({
          fieldErrors: response.error,
          requestError: null
        });
      }
    } catch(err) {
      this.setState({
        fieldErrors: null,
        requestError: err
      });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { username, password, email } = this.state;

    return (
      <div className="formBox">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input
            required={true}
            label="Username"
            name='username'
            value={username}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <Form.Input
            required={true}
            label="Password"
            name='password'
            value={password}
            type='password'
            placeholder="Username"
            onChange={this.handleChange}
          />
          <Form.Input
            required={true}
            label="Email"
            name='email'
            value={email}
            type='email'
            placeholder="john@doe.com"
            onChange={this.handleChange}
          />
          <Button type='submit'>Register</Button>
        </Form>
      </div>
    );
  }
}

export default Register;
