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

class PerkForm extends Component {
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
    const url = "http://localhost:8080/perks";
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({perk: this.state})
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
              placeholder="Perk name"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label="Default Value ($)"
              name='defaultValue'
              type='number'
              value={defaultValue}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="Description"
            name='description'
            value={description}
            placeholder="Description of perk benefits"
            onChange={this.handleChange}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </FormBox>     
    );
  }
}

export default PerkForm;