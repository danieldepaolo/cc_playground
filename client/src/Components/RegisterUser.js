import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormGroup, FormControl, HelpBlock  } from 'react-bootstrap';
import isEmail from 'validator/lib/isEmail';

class RegisterUser extends Component {
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
    const url = `http://localhost:8000/cardmanager/api/users/`;

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

  render() {
    return (
      <div className="formBox">
        <h3>User Registration</h3>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            onChange={e => this.setState({username: e.target.value})}
          />
          {this.state.fieldErrors.hasOwnProperty('username') && 
            this.state.fieldErrors.username.map( error => (
              <HelpBlock className="error" key={error}>{error}</HelpBlock>
            ))
          }
        </FormGroup>
        <FormGroup validationState={this.getPasswordValidationState()}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
          />
          <FormControl.Feedback />
          {this.state.fieldErrors.hasOwnProperty('password') ? (
            this.state.fieldErrors.password.map( error => (
                <HelpBlock className="error" key={error}>{error}</HelpBlock>
              ))
            ) : (
              <HelpBlock>Password must be 6-15 characters.</HelpBlock>
            )
          }
        </FormGroup>
        <FormGroup validationState={this.getEmailValidationState()}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="john@doe.com"
            onChange={e => this.setState({email: e.target.value})}
          />
          <FormControl.Feedback />
          {this.state.fieldErrors.hasOwnProperty('email') && 
            this.state.fieldErrors.email.map( error => (
              <HelpBlock className="error" key={error}>{error}</HelpBlock>
            ))
          }
        </FormGroup>
        <div className="submitBox">
          <Button 
            bsStyle="primary" 
            onClick={this.handleFormSubmit}
          >
            Register
          </Button>
          {this.state.requestError &&
            <span className="requestErr">
              {this.state.requestError}
            </span>
          }
        </div>
      </div>
    );
  }
}

export default RegisterUser;
