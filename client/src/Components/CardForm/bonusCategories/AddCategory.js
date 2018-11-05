import React, { Component } from 'react';
import { Button, Form, Select, Input } from 'semantic-ui-react';
import _ from 'underscore';

import { categoryTypeOptions } from '../constants';

class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      categoryType: '',
      category: '',
      returnAmt: 2
    };

    this.state = this.defaultState;
  }

  reset = () => {
    this.setState(this.defaultState);
  }

  validationForAdd = () => {
    const { categoryType, category, returnAmt } = this.state;
    const alreadyAdded = _.pluck(this.props.categories[categoryType], 'item').includes(category);
    return (categoryType && category && returnAmt > 1 && !alreadyAdded);
  }

  getIconForName = categoryName => {
    console.log(this.props.categories);
    console.log(this.state.categoryType);
    const category = _.findWhere(
      this.props.categories[this.state.categoryType],
      {label: categoryName}
    );

    return category.icon;
  }

  onAdd = () => {
    const { categoryType, category, returnAmt } = this.state;
    this.reset();
    this.props.categoryFunc(
      categoryType,
      category,
      this.getIconForName(category),
      returnAmt
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { categories } = this.props;
    const { categoryType, category, returnAmt } = this.state;

    console.log(categories);
    const productCategoryOptions = categories.product.map(category => {
      return {
        text: category.label,
        value: category.label
      };
    });

    const deliveryOptions = categories.delivery.map(deliveryCategory => {
      return {
        text: deliveryCategory.label,
        value: deliveryCategory.label
      };
    });

    return (
      <Form.Group widths='equal'>
        <Form.Field
          control={Select}
          label="Category Type"
          name='categoryType'
          value={categoryType}
          options={categoryTypeOptions}
          onChange={this.handleChange}
        />
        {
          categoryType === 'product' || categoryType === 'delivery'
          ? (
            <Form.Field
              control={Select}
              label="Category"
              name='category'
              value={category.label}
              options={categoryType === 'product' ? productCategoryOptions : deliveryOptions}
              onChange={this.handleChange}
            />
          ) : (
            <Form.Field
              control={Input}
              label="Category"
              name='category'
              type="text"
              value={category.label}
              onChange={this.handleChange}
            />
          )
        }
        <Form.Field
          control={Input}
          label="Return (%)"
          name='returnAmt'
          type='number'
          min={1.5}
          step={0.5}
          value={returnAmt}
          placeholder="1.5% or higher"
          onChange={this.handleChange}
        />
        <Button type='button' onClick={this.onAdd} disabled={!this.validationForAdd()}>Add</Button>
      </Form.Group>
    );
  }
};

export default AddCategory;
