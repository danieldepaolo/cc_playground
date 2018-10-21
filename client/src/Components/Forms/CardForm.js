import React, { Component } from 'react';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import update from 'immutability-helper';
import styled from 'styled-components';

const processorOptions = [
  { key: 'a', text: 'American Express', value: 'amex' },
  { key: 'd', text: 'Discover', value: 'discover'},
  { key: 'm', text: 'Mastercard', value: 'mc'},
  { key: 'v', text: 'Visa', value: 'visa' }
];

const trueFalse = [
  { key: 'y', text: 'Yes', value: true },
  { key: 'n', text: 'No', value: false },
];

const FormBox = styled.div`
  max-width: 50em;
  margin: 0 auto;
  .ui.selection.dropdown {
    min-width: 8em;
  }
`;

class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issuer: '',
      name: '',
      processor: '',
      selectedCurrency: null,
      defaultReturn: 1,
      annualFee: 0,
      ftf: false,
      waivedFirstYear: false,
      selectedPerks: new Set()
    };
  }

  handleFormSubmit = async () => {
    const url = "http://localhost:8080/cards";
    console.log(this.state);

    let formObj = this.state;
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({card: formObj})
    });

    const data = await response.json();
    console.log(data);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const {
      issuer,
      name,
      processor,
      selectedCurrency,
      defaultReturn,
      annualFee,
      ftf,
      waivedFirstYear,
      selectedPerks
    } = this.state;

    const { perks, currencies } = this.props;
  
    return (
      <FormBox>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label="Issuer"
              name='issuer'
              value={issuer}
              placeholder="Chase, Citi, etc."
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label="Name"
              name='name'
              value={name}
              placeholder="Card name"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Select}
              label="Processor"
              name='processor'
              value={processor}
              options={processorOptions}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label="Default Return"
              name='defaultReturn'
              type='number'
              value={defaultReturn}
              placeholder="1-3%"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label='Annual Fee'
              name='annualFee'
              type='number'
              value={annualFee}
              placeholder="Annual Fee ($)"
              onChange={this.handleChange}
            />
            <Form.Field
              control={Select}
              label="Foreign Transaction Fees"
              name='ftf'
              value={ftf}
              options={trueFalse}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Select}
              label="Fee Waived First Year"
              name='waivedFirstYear'
              value={waivedFirstYear}
              options={trueFalse}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            {perks.map(perk => (
              <Form.Checkbox
                key={perk._id}
                label={perk.name}
                value={perk._id}
                checked={ selectedPerks.has(perk._id) }
                onChange={() => {selectedPerks.has(perk._id) 
                  ? this.setState({ selectedPerks: update(selectedPerks, {$remove: [perk._id]}) })
                  : this.setState({ selectedPerks: update(selectedPerks, {$add: [perk._id]}) })
                }}
              />
            ))}
          </Form.Group>
          <Form.Group>
            {currencies.map(currency => (
              <Form.Radio
                key={currency._id}
                label={currency.name}
                value={currency._id}
                checked={currency._id === selectedCurrency}
                onChange={() => this.setState({selectedCurrency: currency._id})}
              />
            ))}
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </FormBox>
    );
  }
}

export default CardForm;