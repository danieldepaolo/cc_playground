import React, { Component } from 'react';
import { Container, Button, Form, Input, TextArea } from 'semantic-ui-react';
import axios from 'axios';

class CurrencyForm extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      name: '',
      description: '',
      defaultValue: 1
    };

    this.state = this.defaultState;
  }

  resetState = () => {
    this.setState(this.defaultState);
  }

  handleFormSubmit = async () => {
    const url = "http://localhost:8080/currencies";
    const response = await axios.post(url, {
      currency: this.state
    });

    this.resetState();
    console.log(response);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const {
      name,
      description,
      defaultValue,
    } = this.state;
  
    return (
      <Container text>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Field
              control={Input}
              required={true}
              label="Name"
              name='name'
              value={name}
              placeholder="Currency name"
              width={11}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              required={true}
              label="Default Value (cents)"
              name='defaultValue'
              type='number'
              min={0}
              step={0.1}
              value={defaultValue}
              width={5}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="Description"
            name='description'
            value={description}
            placeholder="Description of currency"
            width={16}
            onChange={this.handleChange}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>     
    );
  }
}

export default CurrencyForm;