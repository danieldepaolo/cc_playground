import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

const SpacedImage = styled(Image)`
  margin-bottom: 1em;
`;

const SelectedCard = ({card}) => {
  const detailUrl = `/cards/${card._id}`;
  return (
    <Link to={detailUrl}>
      <SpacedImage src={card.imageUrl} alt={card.name} />
    </Link>
  );
};

export default SelectedCard;
