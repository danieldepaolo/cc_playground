import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';

const CardListItem = ( ({cardInfo}) => {
  const { _id, name, imageUrl, fees } = cardInfo;
  const detailUrl = `/cards/${_id}`;

  return (
    <React.Fragment>
      <Image size='tiny' src={imageUrl} />
      <List.Content>
        <List.Header>
          <Link to={detailUrl}>{name}</Link>
        </List.Header>
        <List.Description>
          Annual Fee: ${fees.annual}
        </List.Description>
      </List.Content>
    </React.Fragment>
  );
});

export default CardListItem;
