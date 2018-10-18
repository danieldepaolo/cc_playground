import React from 'react';

const CardItem = (props) => {
  const { issuer, name, card_image } = props.cardInfo;

  return (
    <div className="cardContent">
      <img src={card_image} alt={name} />
      <h4>{issuer} {name}</h4>
    </div>
  );
};

export default CardItem;
