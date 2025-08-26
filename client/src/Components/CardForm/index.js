import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import update from "immutability-helper";
import _ from "underscore";
import axios from "axios";

import BonusCategoryList from "./bonusCategories/BonusCategoryList";
import AddCategory from "./bonusCategories/AddCategory";
import SignupBonus from "./SignupBonus";
import CheckGroup from "./CheckGroup";
import { FormBorderBox } from "./styled";

import { processorOptions, trueFalse, categoryTypeOptions } from "./constants";

class CardForm extends Component {
  constructor(props) {
    super(props);

    this.optionsData = {
      cardPerks: [],
      currencies: [],
      rewardCategories: [],
    };

    this.defaultState = {
      name: "",
      processor: "",
      imageUrl: "",
      selectedCurrency: null,
      defaultReturn: 1,
      annualFee: 0,
      ftf: false,
      waivedFirstYear: false,
      addedCategories: [],
      signupBonusActive: true,
      signupBonus: {
        months: 3,
        minSpend: 2000,
        amount: 30000,
      },
      selectedPerks: new Set(),
    };

    this.state = _.extend(
      {},
      this.optionsData,
      props.initialState || this.defaultState
    );

    this.handleDeleteCategories = this.handleDeleteCategories.bind(this);
  }

  reset = () => {
    this.setState(
      _.extend(
        {},
        this.optionsData,
        this.props.initialState || this.defaultState
      )
    );
  };

  componentDidMount = async () => {
    this.fetchData();
  };

  fetchData = async () => {
    const perkResponse = await axios("/perks");
    const currencyResponse = await axios("/currencies");
    const categoriesResponse = await axios("/rewardcategories");

    this.setState({
      cardPerks: perkResponse.data.perks,
      currencies: currencyResponse.data.currencies,
      rewardCategories: categoriesResponse.data,
    });
  };

  categoryAdded = (categoryType, categoryName, icon, returnAmt) => {
    this.setState({
      addedCategories: update(this.state.addedCategories, {
        $push: [
          {
            categoryType,
            name: categoryName,
            icon: icon,
            bonusReturn: returnAmt,
          },
        ],
      }),
    });
  };

  handleDeleteCategories(categories) {
    const newAddedCategories = structuredClone(this.state.addedCategories).filter(category => {
      return _.every(categories, deleteCategory => deleteCategory.name !== category.name);
    })

    this.setState({ addedCategories: newAddedCategories });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  submitPressed = () => {
    this.reset();
    this.props.onHandleSubmit(this.state);
  };

  render() {
    const {
      name,
      processor,
      imageUrl,
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
      rewardCategories,
    } = this.state;

    return (
      <Form onSubmit={this.submitPressed}>
        <Form.Group>
          <Form.Input
            required={true}
            label="Name"
            name="name"
            value={name}
            placeholder="Card name"
            width={5}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Image URL"
            name="imageUrl"
            value={imageUrl}
            placeholder="Card image URL"
            width={7}
            onChange={this.handleChange}
          />
          <Form.Select
            required={true}
            label="Processor"
            name="processor"
            value={processor}
            options={processorOptions}
            width={4}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            required={true}
            label="Default Return"
            name="defaultReturn"
            type="number"
            value={defaultReturn}
            placeholder="1-3%"
            onChange={this.handleChange}
          />
          <Form.Input
            required={true}
            label="Annual Fee"
            name="annualFee"
            type="number"
            value={annualFee}
            placeholder="Annual Fee ($)"
            onChange={this.handleChange}
          />
          <Form.Select
            label="Foreign Transaction Fees"
            name="ftf"
            value={ftf}
            options={trueFalse}
            onChange={this.handleChange}
          />
          <Form.Select
            label="Fee Waived First Year"
            name="waivedFirstYear"
            value={waivedFirstYear}
            options={trueFalse}
            onChange={this.handleChange}
          />
        </Form.Group>

        <h3>Currency</h3>
        <CheckGroup
          type="radio"
          header="Currency"
          items={currencies}
          cols={3}
          checkedFunc={(currencyId) => currencyId === selectedCurrency}
          onChangeFunc={(currencyId) =>
            this.setState({ selectedCurrency: currencyId })
          }
        />

        <h3>Bonus Categories</h3>
        <FormBorderBox>
          <AddCategory
            categories={rewardCategories}
            addedCategories={addedCategories}
            categoryFunc={(categoryType, category, icon, returnAmt) => {
              this.categoryAdded(categoryType, category, icon, returnAmt);
            }}
          />
          <BonusCategoryList
            categories={addedCategories}
            onDelete={this.handleDeleteCategories}
          />
        </FormBorderBox>

        <h3>Signup Bonus</h3>
        <SignupBonus
          active={signupBonusActive}
          currencies={currencies}
          signupBonus={signupBonus}
          signupBonusActive={signupBonusActive}
          onFormChange={(name, value) =>
            this.setState({
              signupBonus: update(this.state.signupBonus, {
                [name]: { $set: value },
              }),
            })
          }
          onToggle={() =>
            this.setState((prevState) => {
              return { signupBonusActive: !prevState.signupBonusActive };
            })
          }
        />

        <h3>Perks</h3>
        <CheckGroup
          type="checkbox"
          header="Perks"
          items={cardPerks}
          cols={3}
          checkedFunc={(perkId) => selectedPerks.has(perkId)}
          onChangeFunc={(perkId) => {
            selectedPerks.has(perkId)
              ? this.setState({
                  selectedPerks: update(selectedPerks, { $remove: [perkId] }),
                })
              : this.setState({
                  selectedPerks: update(selectedPerks, { $add: [perkId] }),
                });
          }}
        />

        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default CardForm;
