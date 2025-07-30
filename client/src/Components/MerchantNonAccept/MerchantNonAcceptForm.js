import React, { Component } from 'react';
import { Checkbox, Container, Button, Form, Input, Radio } from 'semantic-ui-react';
import update from 'immutability-helper';

class MerchantNonAcceptForm extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      name: '',
      otherNames: [],
      creditAccepted: true,
      processorAcceptance: {
        amex: false,
        discover: false,
        visa: true,
        mc: true
      }
    };

    this.state = props.initialState || this.defaultState;
  }

  resetState = () => this.setState(this.defaultState)

  handleFormSubmit = () => {
    this.props.onHandleSubmit(this.state);
    this.resetState();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  toggleCreditAcceptance = () => {
    const newVal = !this.state.creditAccepted;
    this.setState({ creditAccepted: newVal })
  }
  toggleAccept = name => {
    this.setState(prev => {
      return update(prev, {processorAcceptance: {$toggle: [name]}} );
    });
  }

  render() {
    const {
      name,
      altNames,
      creditAccepted,
      processorAcceptance
    } = this.state;
  
    return (
      <Container text>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group>
            <Form.Field
              control={Input}
              required={true}
              label="Merchant name"
              name='name'
              value={name}
              placeholder="Merchant name"
              width={11}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              control={Radio}
              required={true}
              label="Credit accepted"
              name='creditAccepted'
              checked={creditAccepted}
              width={5}
              onChange={this.toggleCreditAcceptance}
              toggle
            />
            <Form.Field disabled={!this.state.creditAccepted} name="processorAccept">
              <Checkbox
                name='amex'
                label="American Express"
                checked={processorAcceptance.amex}
                onChange={() => this.toggleAccept('amex')} />
              <Checkbox
                name='discover'
                label="Discover"
                checked={processorAcceptance.discover}
                onChange={() => this.toggleAccept('discover')} />
              <Checkbox
                name='mc'
                label="Mastercard"
                checked={processorAcceptance.mc}
                onChange={() => this.toggleAccept('mc')} />
              <Checkbox
                name='visa'
                label="Visa"
                checked={processorAcceptance.visa}
                onChange={() => this.toggleAccept('visa')} />
            </Form.Field>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>     
    );
  }
}

export default MerchantNonAcceptForm;