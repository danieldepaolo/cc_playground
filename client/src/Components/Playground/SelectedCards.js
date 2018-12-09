import React from 'react';
import styled from 'styled-components';
import { List, Image } from 'semantic-ui-react';

const CardList = styled.div`
  padding: 1em;
`;

const SelectedCards = ( ({cards}) => {
  return (
    <List relaxed="very" divided>
      {cards.map(card => (
        <List.Item key={card._id}>
          <Image size='tiny' src={card.imageUrl} />
          <List.Content>
            <List.Header>{card.name}</List.Header>
            <List.Description>
              Annual Fee: ${card.fees.annual}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
});

export default SelectedCards;
