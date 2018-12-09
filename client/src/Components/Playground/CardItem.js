import React from 'react';
import { Link } from 'react-router-dom';

const CardItem = ( ({cardInfo}) => {
  const { _id, name, imageUrl } = cardInfo;
  const detailUrl = `/cards/${_id}`;

  return (
    <div className="cardContent">
      <img src={imageUrl} alt={name} />
      <Link to={detailUrl}>
        <h4>{name}</h4>
      </Link>
    </div>
  );
});

export default CardItem;
