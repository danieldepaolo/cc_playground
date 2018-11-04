import React, { Component } from 'react';

import CardForm from './CardForm';
import axios from 'axios';

class CardEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: null
    };
  }

  componentDidMount = async () => {
    const response = await axios.get(`http://localhost:8080/cards/${this.props.match.params.id}`);
    this.setState({cardData: response.data.card});
  }

  handleFormSubmit = async (formObj) => {
    // Some cleanup of the body data
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
    if (!formObj.signupBonusActive) {
      formObj.signupBonus = null;
    }

    console.log(formObj);
  
    const url = `http://localhost:8080/cards/${this.props.match.params.id}`;
    const response = await axios.put(url, {card: formObj});
    
    console.log(response);
  }

  getInitialState = () => {
    const { cardData } = this.state;

    // If we found a card, we want to populate the edit form with its info
    // Otherwise just default
    return cardData ? {
      name: cardData.name,
      processor: cardData.processor,
      selectedCurrency: cardData.rewardCurrency,
      defaultReturn: cardData.defaultReturn,
      annualFee: cardData.fees.annual,
      ftf: cardData.fees.foreign,
      waivedFirstYear: cardData.fees.waivedFirstYear,
      bonusCategories: cardData.bonusReward.categories,
      signupBonusActive: (cardData.bonusReward.signup !== undefined),
      signupBonus: cardData.bonusReward.signup,
      selectedPerks: new Set(cardData.perks)
    } : null;
  }

  render() {
    const initialState = this.getInitialState();
    console.log(initialState);

    return initialState ? (
      <div>
        <h3>Edit {initialState.name}</h3>
        <CardForm
          {...this.props}
          initialState={initialState}
          onHandleSubmit={(formObj) => this.handleFormSubmit(formObj)}
        />
      </div>
    ) : null;
  }
}

export default CardEditForm;