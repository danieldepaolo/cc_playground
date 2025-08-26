import React, { Component } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Checkbox,
  Container,
  Button,
} from "semantic-ui-react";
import _ from "underscore";
import styled from "styled-components";

const ListBox = styled.div`
  padding: 1em;
`;

class BonusCategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: [],
    };

    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleDeleteCategories = this.handleDeleteCategories.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.checkboxIndeterminate = this.checkboxIndeterminate.bind(this);
    this.categoryWithName = this.categoryWithName.bind(this);
  }

  categoryWithName(name) {
    return _.find(this.props.categories, (category) => category.name === name);
  }

  // categories() {
  //   const categoriesWithType = []

  //   _.each(this.props.categories, (categories, type) => {
  //     categoriesWithType.push(..._.map(categories, category => ({ ...category, type })))
  //   });

  //   return categoriesWithType;
  // }

  toggleSelected(categoryName) {
    const { selectedCategories } = this.state;

    const on = !selectedCategories.includes(categoryName);

    const newSelectedCategories = on
      ? [...selectedCategories, categoryName]
      : selectedCategories.filter((category) => category !== categoryName);

    this.setState({ selectedCategories: newSelectedCategories });
  }

  checkboxIndeterminate() {
    return (
      this.state.selectedCategories.length > 0 &&
      this.state.selectedCategories.length < this.props.categories.length
    );
  }

  handleToggleAll() {
    if (
      this.state.selectedCategories.length === 0 ||
      this.checkboxIndeterminate()
    ) {
      this.setState({ selectedCategories: _.pluck(this.props.categories, "name") });
    } else {
      this.setState({ selectedCategories: [] });
    }
  }

  handleDeleteCategories() {
    this.props.onDelete(
      this.state.selectedCategories.map(this.categoryWithName)
    );

    this.setState({
      selectedCategories: [],
    });
  }

  render() {
    const { selectedCategories } = this.state;

    if (!this.props.categories?.length) return null;

    return (
      <Container>
        {this.props.onDelete && (
          <>
            <span style={{ marginRight: 16 }}>Row Actions</span>
            <Button
              disabled={this.state.selectedCategories.length === 0}
              onClick={this.handleDeleteCategories}
            >
              Delete
            </Button>
          </>
        )}
        <Table celled>
          <TableHeader>
            <TableRow>
              {this.props.onDelete && (
                <TableHeaderCell>
                  <Checkbox
                    indeterminate={this.checkboxIndeterminate()}
                    checked={
                      selectedCategories.length === this.props.categories.length
                    }
                    onClick={this.handleToggleAll}
                  />
                </TableHeaderCell>
              )}
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Category Type</TableHeaderCell>
              <TableHeaderCell>Return</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.categories.map((category) => (
              <TableRow key={category.name}>
                {this.props.onDelete && (
                  <TableCell>
                    <Checkbox
                      checked={selectedCategories.includes(category.name)}
                      onClick={() => this.toggleSelected(category.name)}
                    />
                  </TableCell>
                )}
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.categoryType}</TableCell>
                <TableCell>{category.bonusReturn}x</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

export default BonusCategoryList;
