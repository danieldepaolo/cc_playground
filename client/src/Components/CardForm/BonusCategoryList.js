import React from 'react';
import { List } from 'semantic-ui-react'
import _ from 'underscore';

const BonusCategoryList = ({categories}) => {
  const sortedCategories = _.keys(categories).sort();

  return (
    <List>
      {sortedCategories.map(categoryName => {
        return (
          <List.Item key={categoryName}>
            <List.Header>{categoryName}</List.Header>
            {categories[categoryName]}x
          </List.Item>
        );
      })}
    </List>
  );
};

export default BonusCategoryList;
