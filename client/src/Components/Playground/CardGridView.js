import React, { Component } from 'react';
import CardSelectItem from './CardSelectItem';

class CardGridView extends Component {
  render() {
    const { cards } = this.props;

    return (
      <div className="cardDisplayArea">
        {cards.map( (card) => (
          <CardSelectItem
            cardInfo={card}
            key={card.name}
            isSelected={this.props.cardSelectStatus[card.id]}
            notifySelectChange={this.props.onSelectChange}
          />
        ))}
      </div>
    );
  }
}

export default CardGridView;
