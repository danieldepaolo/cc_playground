import React, { Component } from 'react';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import update from 'immutability-helper';
import styled from 'styled-components';

import AddCategory from './AddCategory';
import BonusCategoryList from './BonusCategoryList';
import SignupBonus from './SignupBonus';
import { processorOptions, trueFalse } from './constants';

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

    this.defaultState = {
      issuer: '',
      name: '',
      processor: '',
      selectedCurrency: null,
      defaultReturn: 1,
      annualFee: 0,
      ftf: false,
      waivedFirstYear: false,
      bonusCategories: {},
      signupBonus: {
        months: 3,
        minSpend: 2000,
        selectedCurrency: null,
        amount: 30000
      },
      selectedPerks: new Set()
    };

    this.state = this.defaultState;
  }

  reset = () => {
    this.setState(this.defaultState);
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
    this.reset();
    console.log(data);
  }

  categoryAdded = (categoryType, category, returnAmt) => {
    this.setState({bonusCategories: update(
      this.state.bonusCategories, {$merge: {
        [categoryType]: {[category]: returnAmt}
      }}
    )});
  }

  signup

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
      bonusCategories,
      signupBonus,
      selectedPerks
    } = this.state;

    const { perks, currencies, categories } = this.props;
  
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
          <h4>Currency</h4>
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
          <h4>Bonus Categories</h4>
          <AddCategory
            categories={categories}
            categoryFunc={(categoryType, category, returnAmt) => this.categoryAdded(categoryType, category, returnAmt)}
          />
          <BonusCategoryList categories={bonusCategories} />
          <h4>Signup Bonus</h4>
          <SignupBonus
            currencies={currencies}
            signupBonus={signupBonus}
            signupBonusFunc={(name, value) =>
              this.setState({
                signupBonus: {$merge: {[name]: value}}
              })
            }
          />
          <h4>Perks</h4>
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
          <Button type='submit'>Submit</Button>
        </Form>
      </FormBox>
    );
  }
}

export default CardForm;