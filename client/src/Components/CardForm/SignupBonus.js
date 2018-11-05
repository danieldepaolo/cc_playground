import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import { FormBorderBox } from './styled';

class SignupBonus extends Component {
  handleChange = (e, { name, value }) => this.props.onFormChange(name, value)

  render() {
    const { active, signupBonus, signupBonusActive, onToggle } = this.props;

    return (
      <FormBorderBox>
        <Form.Checkbox
          label="Signup Bonus"
          checked={signupBonusActive}
          onChange={e => onToggle()}
        />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            required={active}
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
            required={active}
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
            required={active}
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
      </FormBorderBox>
    );
  }
};

export default SignupBonus;
