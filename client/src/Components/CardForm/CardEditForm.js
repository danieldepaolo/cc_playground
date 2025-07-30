import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import { sendRequestAuth } from '../../AuthService';
import CardForm from '.';
import axios from 'axios';

class CardEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: null
    };

    this.cardsUrl = this.cardsUrl.bind(this);
  }

  cardsUrl() {
    return `/cards/${this.props.match.params.id}`;
  }

  componentDidMount = async () => {
    const response = await axios(this.cardsUrl());
    this.setState({cardData: response.data.card});
  }

  handleFormSubmit = async (formObj) => {
    // Some cleanup of the body data
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
    if (!formObj.signupBonusActive) {
      formObj.signupBonus = null;
    }
  
    const url = this.cardsUrl();
    const response = await sendRequestAuth(url, 'put', {card: formObj});
    
    this.props.history.push(url);
  }

  getInitialState = () => {
    const { cardData } = this.state;

    // If we found a card, we want to populate the edit form with its info
    // Otherwise just default
    return cardData ? {
      name: cardData.name,
      processor: cardData.processor,
      imageUrl: cardData.imageUrl,
      selectedCurrency: cardData.rewardCurrency._id,
      defaultReturn: cardData.defaultReturn,
      annualFee: cardData.fees.annual,
      ftf: cardData.fees.foreign,
      waivedFirstYear: cardData.fees.waivedFirstYear,
      addedCategories: cardData.bonusReward.categories,
      signupBonusActive: (cardData.bonusReward.signup !== undefined),
      signupBonus: cardData.bonusReward.signup || {},
      selectedPerks: new Set(cardData.perks.map(perk => perk._id))
    } : null;
  }

  render() {
    const initialState = this.getInitialState();

    return initialState && (
      <Container>
        <h2>Edit {initialState.name}</h2>
        <CardForm
          {...this.props}
          initialState={initialState}
          onHandleSubmit={this.handleFormSubmit}
        />
      </Container>
    );
  }
}

export default CardEditForm;