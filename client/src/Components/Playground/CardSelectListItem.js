import React, { Component } from 'react';
import CardListItem from './CardListItem';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';

const CheckboxDiv = styled.div`
  float: right;
`;

class CardSelectListItem extends Component {
  handleChange = (event) => {
    this.props.notifySelectChange(this.props.cardInfo._id);
  }

  render() {
    const { cardInfo, isSelected } = this.props;

    return (
      <List.Item id={cardInfo._id}>
        <CardListItem
          cardInfo={cardInfo}
        />
        <CheckboxDiv className="pretty p-switch p-fill">
          <input
            type="checkbox"
            name="card"
            checked={isSelected}
            onChange={this.handleChange}
          />
          <div className="state">
            <label></label>
          </div>
        </CheckboxDiv>
      </List.Item>
    );
  }
}

export default CardSelectListItem;
