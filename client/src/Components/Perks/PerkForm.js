import React, { Component } from 'react';
import { Container, Button, Form, Input, TextArea } from 'semantic-ui-react';

class PerkForm extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      name: '',
      description: '',
      defaultValue: 1
    };

    this.state = props.initialState || this.defaultState;
  }

  resetState = () => {
    this.setState(this.defaultState);
  }

  handleFormSubmit = () => {
    this.props.onHandleSubmit(this.state);
    this.resetState();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const {
      name,
      description,
      defaultValue
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
              placeholder="Perk name"
              width={11}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              required={true}
              label="Default Value ($)"
              name='defaultValue'
              type='number'
              min={0}
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
            placeholder="Description of perk benefits"
            width={16}
            onChange={this.handleChange}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>     
    );
  }
}

export default PerkForm;