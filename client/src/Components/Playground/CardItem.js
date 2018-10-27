import React from 'react';
import { Link } from 'react-router-dom';

const CardItem = (props) => {
  const { _id, name, imageUrl } = props.cardInfo;
  const detailUrl = `/cards/${_id}`;

  return (
    <div className="cardContent">
      <img src={imageUrl} alt={name} />
      <Link to={detailUrl}>
        <h4>{name}</h4>
      </Link>
    </div>
  );
};

export default CardItem;
