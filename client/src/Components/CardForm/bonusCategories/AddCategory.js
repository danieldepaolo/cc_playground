import React, { Component } from "react";
import { Button, Form, Select, Input } from "semantic-ui-react";
import _ from "underscore";

import { categoryTypeOptions } from "../constants";

class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      categoryType: "",
      categoryName: "",
      returnAmt: 2,
    };

    this.state = { ...this.defaultState };
  }

  reset = () => {
    this.setState({ ...this.defaultState });
  };

  validationForAdd = () => {
    const { categoryType, categoryName, returnAmt } = this.state;
    const alreadyAdded = _.pluck(this.props.addedCategories, "name").includes(
      categoryName
    );
    return categoryType && categoryName && returnAmt >= 1 && !alreadyAdded;
  };

  getIconForName = (categoryName) => {
    const category = _.findWhere(this.props.categories, { name: categoryName });

    return category ? category.icon : null;
  };

  onAdd = () => {
    const { categoryType, categoryName, returnAmt } = this.state;
    this.reset();
    this.props.categoryFunc(
      categoryType,
      categoryName,
      this.getIconForName(categoryName),
      returnAmt
    );
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { categories } = this.props;
    const { categoryType, categoryName, returnAmt } = this.state;

    const productCategoryOptions = categories
      .filter((c) => c.categoryType === "product")
      .map((category) => {
        return {
          text: category.name,
          value: category.name,
        };
      });

    const deliveryOptions = categories
      .filter((c) => c.categoryType === "delivery")
      .map((deliveryCategory) => {
        return {
          text: deliveryCategory.name,
          value: deliveryCategory.name,
        };
      });

    return (
      <Form.Group widths="equal">
        <Form.Field
          control={Select}
          label="Category Type"
          name="categoryType"
          value={categoryType}
          options={categoryTypeOptions}
          onChange={this.handleChange}
        />
        {categoryType === "product" || categoryType === "delivery" ? (
          <Form.Field
            control={Select}
            label="Category"
            name="categoryName"
            value={categoryName}
            options={
              categoryType === "product"
                ? productCategoryOptions
                : deliveryOptions
            }
            onChange={this.handleChange}
          />
        ) : (
          <Form.Field
            control={Input}
            label="Category"
            name="categoryName"
            type="text"
            value={categoryName}
            onChange={this.handleChange}
          />
        )}
        <Form.Field
          control={Input}
          label="Return (%)"
          name="returnAmt"
          type="number"
          min={1.5}
          step={0.5}
          value={returnAmt}
          placeholder="1.5% or higher"
          onChange={this.handleChange}
        />
        <Button
          type="button"
          onClick={this.onAdd}
          disabled={!this.validationForAdd()}
        >
          Add
        </Button>
      </Form.Group>
    );
  }
}

export default AddCategory;
