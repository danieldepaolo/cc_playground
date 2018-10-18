import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      email: '',
      fieldErrors: {},
      requestError: null
    };
  }

  getPasswordValidationState () {
    const length = this.state.password.length;
    if (length === 0) {
      return null;
    }
    return length >= 6 && length <= 15
      ? 'success' : 'error';
  }

  getEmailValidationState () {
    if (this.state.email.length === 0) {
      return null;
    }
    return isEmail(this.state.email) ? 'success' : 'error';
  }

  async handleFormSubmit () {
    const url = `http://localhost:8000/register`;

    await fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      response.json().then(errors => {
        this.setState({
          fieldErrors: JSON.parse(errors),
          requestError: null
        });
      }).catch(error => {
        console.log("Response parse error: ", error);
      });
    }).catch(error => {
      this.setState({
        fieldErrors: null,
        requestError: "Failed to fetch from server"
      });
    });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { username, password, email } = this.state;

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
            placeholder="Username"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            name='email'
            value={email}
            type='email'
            placeholder="john@doe.com"
            onChange={this.handleChange}
          />
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Register;
