import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import CardForm from '.';
import axios from 'axios';

class CardEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardData: null
    };
  }

  componentDidMount = async () => {
    const response = await axios(`/cards/${this.props.match.params.id}`);
    this.setState({cardData: response.data.card});
  }

  handleFormSubmit = async (formObj) => {
    // Some cleanup of the body data
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
    if (!formObj.signupBonusActive) {
      formObj.signupBonus = null;
    }

    console.log(formObj);
  
    const url = `/cards/${this.props.match.params.id}`;
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
      imageUrl: cardData.imageUrl,
      selectedCurrency: cardData.rewardCurrency._id,
      defaultReturn: cardData.defaultReturn,
      annualFee: cardData.fees.annual,
      ftf: cardData.fees.foreign,
      waivedFirstYear: cardData.fees.waivedFirstYear,
      addedCategories: cardData.bonusReward.categories,
      signupBonusActive: (cardData.bonusReward.signup !== undefined),
      signupBonus: cardData.bonusReward.signup,
      selectedPerks: new Set(cardData.perks.map(perk => perk._id))
    } : null;
  }

  render() {
    const initialState = this.getInitialState();
    console.log(initialState);

    return initialState && (
      <Container>
        <h3>Edit {initialState.name}</h3>
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