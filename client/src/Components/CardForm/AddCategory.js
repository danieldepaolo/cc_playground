import React, { Component } from 'react';
import { Button, Form, Select, Input } from 'semantic-ui-react';

import { categoryTypeOptions } from './constants';

class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      categoryType: '',
      category: '',
      returnAmt: 1.5
    };

    this.state = this.defaultState;
  }

  reset = () => {
    this.setState(this.defaultState);
  }

  onAdd = () => {
    this.reset();
    this.props.categoryFunc(
      this.state.categoryType,
      this.state.category,
      this.state.returnAmt
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { categories } = this.props;
    const { categoryType, category, returnAmt } = this.state;

    const productCategoryOptions = categories.productCategories.map(category => {
      return {
        text: category,
        value: category
      };
    });

    const deliveryOptions = categories.deliveryCategories.map(deliveryCategory => {
      return {
        text: deliveryCategory,
        value: deliveryCategory
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
          categoryType === 'products' || categoryType === 'delivery'
          ? (
            <Form.Field
              control={Select}
              label="Category"
              name='category'
              value={category}
              options={categoryType === 'products' ? productCategoryOptions : deliveryOptions}
              onChange={this.handleChange}
            />
          ) : (
            <Form.Field
              control={Input}
              label="Category"
              name='category'
              type="text"
              value={category}
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
        <Button type='button' onClick={this.onAdd}>Add</Button>
      </Form.Group>
    );
  }
};

export default AddCategory;
