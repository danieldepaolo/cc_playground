import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import CardForm from '.';

import { sendRequestAuth } from '../../AuthService';

class CardNewForm extends Component {
  handleFormSubmit = async (formObj) => {
    // Some cleanup of the body data
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
    if (!formObj.signupBonusActive) {
      formObj.signupBonus = null;
    }

    const response = await sendRequestAuth("/cards", "post", {card: formObj});
    console.log(response);
  }

  render() {
    return (
      <Container>
        <h2>Create New Card</h2>
        <CardForm
          {...this.props}
          onHandleSubmit={(formObj) => this.handleFormSubmit(formObj)}
        />
      </Container>
    );
  }
}

export default CardNewForm;