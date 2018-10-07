import React, { Component } from 'react';
import CardItem from './CardItem';

class CardSelectItem extends Component {
  handleChange = (event) => {
    this.props.notifySelectChange(this.props.cardInfo.id);
  }

  render() {
    const { cardInfo, isSelected } = this.props;

    return (
      <div className="cardItem">
        <CardItem
          cardInfo={cardInfo}
        />
        <div className="pretty p-switch p-fill">
          <input
            type="checkbox"
            name="card"
            checked={isSelected}
            onChange={this.handleChange}
          />
          <div className="state">
            <label></label>
          </div>
        </div>
      </div>
    );
  }
}

export default CardSelectItem;
