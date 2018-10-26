import React from 'react';
import { List } from 'semantic-ui-react'
import _ from 'underscore';

const BonusCategoryList = ({categories}) => {
  const categoryList = _.flatten(_.values(categories));

  return (
    <List>
      {categoryList.map(category => {
        return (
          <List.Item key={category.name}>
            <List.Header>{category.name}</List.Header>
            {category.amount}x
          </List.Item>
        );
      })}
    </List>
  );
};

export default BonusCategoryList;
