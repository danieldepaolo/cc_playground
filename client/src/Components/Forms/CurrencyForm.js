import React, { Component } from 'react';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';

const FormBox = styled.div`
  max-width: 30em;
  margin: 0 auto;
  .ui.selection.dropdown {
    min-width: 8em;
  }
`;

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
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({currency: this.state})
    });

    const data = await response.json();
    this.resetState();
    console.log(data);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const {
      name,
      description,
      defaultValue,
    } = this.state;
  
    return (
      <FormBox>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label="Name"
              name='name'
              value={name}
              placeholder="Currency name"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label="Default Value (cents)"
              name='defaultValue'
              type='number'
              min={0}
              step={0.1}
              value={defaultValue}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="Description"
            name='description'
            value={description}
            placeholder="Description of currency"
            onChange={this.handleChange}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </FormBox>     
    );
  }
}

export default CurrencyForm;