import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

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

  async handleFormSubmit () {
    const url = 'http://localhost:8080/';

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
            placeholder="Username"
            onChange={this.handleChange}
          />
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
