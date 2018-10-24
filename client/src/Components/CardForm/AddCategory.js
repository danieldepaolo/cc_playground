import React, { Component } from 'react';
import { Button, Form, Select, Input } from 'semantic-ui-react';

class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
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
      this.state.category,
      this.state.returnAmt
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { categories } = this.props;
    const { category, returnAmt } = this.state;

    const categoryOptions = categories.map(category => {
      return {
        text: category,
        value: category
      };
    });

    return (
      <div>
        <Select
          label="Bonus Category"
          name='category'
          value={category}
          options={categoryOptions}
          onChange={this.handleChange}
        />
        <Input
          label="Return (%)"
          name='returnAmt'
          type='number'
          min={1.5}
          step={0.5}
          value={returnAmt}
          placeholder="1.5% or higher"
          onChange={this.handleChange}
          action={<Button type='button' onClick={this.onAdd}>Add</Button>}
        />
      </div>
    );
  }
};

export default AddCategory;
