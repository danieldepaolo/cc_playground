import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import update from 'immutability-helper';
import _ from 'underscore';
import axios from 'axios';

import BonusCategories from './bonusCategories';
import SignupBonus from './SignupBonus';
import CheckGroup from './CheckGroup';
import { processorOptions, trueFalse, categoryTypeOptions } from './constants';

class CardForm extends Component {
  constructor(props) {
    super(props);

    let defaultCategoryArrays = {};
    categoryTypeOptions.forEach(categoryType => {
      defaultCategoryArrays[categoryType.value] = [];
    });

    this.optionsData = {
      cardPerks: [],
      currencies: [],
      rewardCategories: {
        delivery: [],
        product: []
      }
    };

    this.defaultState = {
      name: '',
      processor: '',
      selectedCurrency: null,
      defaultReturn: 1,
      annualFee: 0,
      ftf: false,
      waivedFirstYear: false,
      addedCategories: defaultCategoryArrays,
      signupBonusActive: true,
      signupBonus: {
        months: 3,
        minSpend: 2000,
        amount: 30000
      },
      selectedPerks: new Set()
    };

    this.state = _.extend(
      {},
      this.optionsData,
      this.props.initialState ? this.props.initialState : this.defaultState
    );
    
    console.log(this.state);
  }

  reset = () => {
    this.setState(_.extend(
      {},
      this.optionsData,
      this.props.initialState ? this.props.initialState : this.defaultState
    ));
  }

  componentDidMount = async () => {
    this.fetchData();
  }

  fetchData = async () => {
    const perkResponse = await axios.get("http://localhost:8080/perks");
    const currencyResponse = await axios.get("http://localhost:8080/currencies");
    const categoriesResponse = await axios.get("http://localhost:8080/rewardcategories");

    this.setState({
      cardPerks: perkResponse.data.perks,
      currencies: currencyResponse.data.currencies,
      rewardCategories: categoriesResponse.data
    });
  }

  categoryAdded = (categoryType, category, icon, returnAmt) => {
    console.log(this.state);
    this.setState({addedCategories: update(
      this.state.addedCategories, {
        [categoryType]: {$push: 
          [{
            name: category,
            icon: icon,
            bonusReturn: returnAmt
          }]
        }
      }
    )});
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const {
      name,
      processor,
      selectedCurrency,
      defaultReturn,
      annualFee,
      ftf,
      waivedFirstYear,
      addedCategories,
      signupBonusActive,
      signupBonus,
      selectedPerks,

      // options we need from other db collections
      cardPerks,
      currencies,
      rewardCategories
    } = this.state;
  
    return (
      <Form onSubmit={() => this.props.onHandleSubmit(this.state)}>
        <Form.Group widths='equal'>
          <Form.Input
            required={true}
            label="Name"
            name='name'
            value={name}
            placeholder="Card name"
            onChange={this.handleChange}
          />
          <Form.Select
            required={true}
            label="Processor"
            name='processor'
            value={processor}
            options={processorOptions}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            required={true}
            label="Default Return"
            name='defaultReturn'
            type='number'
            value={defaultReturn}
            placeholder="1-3%"
            onChange={this.handleChange}
          />
          <Form.Input
            required={true}
            label='Annual Fee'
            name='annualFee'
            type='number'
            value={annualFee}
            placeholder="Annual Fee ($)"
            onChange={this.handleChange}
          />
          <Form.Select
            label="Foreign Transaction Fees"
            name='ftf'
            value={ftf}
            options={trueFalse}
            onChange={this.handleChange}
          />
          <Form.Select
            label="Fee Waived First Year"
            name='waivedFirstYear'
            value={waivedFirstYear}
            options={trueFalse}
            onChange={this.handleChange}
          />
        </Form.Group>

        <CheckGroup
          type='radio'
          header="Currency"
          items={currencies}
          cols={3}
          checkedFunc={(currencyId) => currencyId === selectedCurrency}
          onChangeFunc={(currencyId) => this.setState({selectedCurrency: currencyId})}
        />

        <BonusCategories
          rewardCategories={rewardCategories}
          categoryFunc={this.categoryAdded}
          addedCategories={addedCategories}
        />

        <SignupBonus
          active={signupBonusActive}
          currencies={currencies}
          signupBonus={signupBonus}
          signupBonusActive={signupBonusActive}
          onFormChange={(name, value) =>
            this.setState({
              signupBonus: update(this.state.signupBonus,
                {[name]: {$set: value}}
              )
            })
          }
          onToggle={() => 
            this.setState(prevState => {
              return {signupBonusActive: !prevState.signupBonusActive}
            })
          }
        />

        <CheckGroup
          type='checkbox'
          header="Perks"
          items={cardPerks}
          cols={3}
          checkedFunc={(perkId) => selectedPerks.has(perkId)}
          onChangeFunc={(perkId) => {selectedPerks.has(perkId)
            ? this.setState({ selectedPerks: update(selectedPerks, {$remove: [perkId]}) })
            : this.setState({ selectedPerks: update(selectedPerks, {$add: [perkId]}) })
          }}
        />

        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

export default CardForm;
