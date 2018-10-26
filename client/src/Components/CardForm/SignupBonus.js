import React, { Component } from 'react';
import { Form, Select, Input } from 'semantic-ui-react';

class SignupBonus extends Component {
  handleChange = (e, { name, value }) => this.props.signupBonusFunc(name, value)

  render() {
    const { active, currencies, signupBonus } = this.props;

    const currencyOptions = currencies.map(currency => {
      return {
        text: currency.name,
        value: currency._id
      };
    });

    return (
      <Form.Group widths='equal'>
        <Form.Field
          control={Select}
          label="Currency"
          name='selectedCurrency'
          value={signupBonus.selectedCurrency}
          options={currencyOptions}
          disabled={!active}
          placeholder="Default: $"
          onChange={this.handleChange}
        />
        <Form.Field
          control={Input}
          label="Time Period (months)"
          name='months'
          type='number'
          min={1}
          max={24}
          value={signupBonus.months}
          disabled={!active}
          onChange={this.handleChange}
        />
        <Form.Field
          control={Input}
          label="Min Spend ($)"
          name='minSpend'
          type='number'
          min={0}
          step={100}
          value={signupBonus.minSpend}
          disabled={!active}
          onChange={this.handleChange}
        />
        <Form.Field
          control={Input}
          label="Reward Amount"
          name='amount'
          type='number'
          min={0}
          step={1000}
          value={signupBonus.amount}
          disabled={!active}
          onChange={this.handleChange}
        />
      </Form.Group>
    );
  }
};

export default SignupBonus;
