import React, { Component } from 'react';

import CardForm from './CardForm';

class CardEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: null
    };
  }

  componentDidMount = async () => {
    const response = await fetch(`http://localhost:8080/cards/${this.props.match.params.id}`);
    const cardData = await response.json();
    this.setState({cardData: cardData.card});
  }

  handleFormSubmit = async (formObj) => {
    const url = `http://localhost:8080/cards/${this.props.match.params.id}`;

    // Some cleanup of the body data
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
    if (!formObj.signupBonusActive) {
      formObj.signupBonus = null;
    }

    console.log(formObj);
  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({card: formObj})
    });

    const data = await response.json();
    console.log(data);
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