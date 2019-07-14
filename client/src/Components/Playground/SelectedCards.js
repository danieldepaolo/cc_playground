import React from 'react';
import styled from 'styled-components';

import { CenteredHeader } from '../styled'
import SelectedCard from './SelectedCard';

const CardList = styled.div`
  padding: 1em;
  height: 100%;
  border: 1px inset rgba(0,0,0,0.2);
  border-radius: 5px;
`;

const SelectedCards = ( ({cards}) => {
  return (
    <CardList>
      <CenteredHeader><i className="credit card icon"></i> Selected</CenteredHeader>
      {cards.map(card => (
        <SelectedCard card={card} />
      ))}
    </CardList>
  );
});

export default SelectedCards;
