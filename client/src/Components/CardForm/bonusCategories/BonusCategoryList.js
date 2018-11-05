import React from 'react';
import { List } from 'semantic-ui-react'
import _ from 'underscore';
import styled from 'styled-components';

const ListBox = styled.div`
  padding: 1em;
`;

const BonusCategoryList = ({categories}) => {
  console.log(categories);
  const categoryList = _.flatten(_.values(categories));

  return (
    <ListBox>
      <List>
        {categoryList.map(category => (
          <List.Item key={category.name}>
            <List.Icon name={category.icon} />
            <List.Content>{category.name}: {category.bonusReturn}x</List.Content> 
          </List.Item>
        ))}
      </List>
    </ListBox>
  );
};

export default BonusCategoryList;
