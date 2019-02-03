import React, { Component } from 'react';
import CardSelectListItem from './CardSelectListItem';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';

import { CenteredHeader } from '../styled'

const CardSelectListDiv = styled.div`
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 5px;
  padding: 1em;
  overflow-y: auto;
  height: 100%;
  min-width: 15em;
`;

class CardSelectList extends Component {
  render() {
    const { cards } = this.props;

    return (
      <CardSelectListDiv>
        <CenteredHeader>Cards</CenteredHeader>
        <List relaxed="very" divided>
          {cards.map( (card) => (
            <CardSelectListItem
              cardInfo={card}
              key={card.name}
              isSelected={this.props.cardSelectStatus[card._id]}
              notifySelectChange={this.props.onSelectChange}
            />
          ))}
        </List>
      </CardSelectListDiv>
    );
  }
}

export default CardSelectList;
