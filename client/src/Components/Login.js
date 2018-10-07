import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

// props
// onLogin: func(token_key)
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userOrEmail: '',
      password: '',
      error: null
    };
  }

  async handleFormSubmit () {
    const url = 'http://localhost:8000/cardmanager/rest-auth/login/';

    let loginBody = isEmail(this.state.userOrEmail) ? {
      email: this.state.userOrEmail
    } : {
      username: this.state.userOrEmail
    };
    loginBody.password = this.state.password;
    console.log(loginBody);

    await fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginBody)
    }).then(response => {
      response.json().then(parsed => {
        if (parsed.hasOwnProperty('key')) {
          this.setState({error: null});
          this.props.onLogin(parsed.key);
        } else {
          this.setState({error: parsed.non_field_errors[0]});
        }
      }).catch(error => {
        console.log("Response parse error: ", error);
      });
    }).catch(() => {
      this.setState({error: "Failed to fetch from server"});
    });
  }

  render() {
    return (
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl
          type="text"
          value={this.state.userOrEmail}
          onChange={e => this.setState({userOrEmail: e.target.value})}
        />
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type="password"
          value={this.state.password}
          onChange={e => this.setState({password: e.target.value})}
        />
        <div className="submitBox">
          <Button 
            bsStyle="primary" 
            onClick={this.handleFormSubmit}
          >
            Login
          </Button>
          {this.state.error &&
            <span className="requestErr">
              {this.state.error}
            </span>
          }
        </div>
      </FormGroup>
    );
  }
}

export default Login;
