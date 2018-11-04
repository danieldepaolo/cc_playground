import React, { Component } from 'react';

import CardForm from './CardForm';
import axios from 'axios';

class CardNewForm extends Component {
  handleFormSubmit = async (formObj) => {
    // Some cleanup of the body data
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
    if (!formObj.signupBonusActive) {
      formObj.signupBonus = null;
    }

    console.log(formObj);
  
    const url = "http://localhost:8080/cards";
    const response = await axios.post(url, {card: formObj});

    console.log(response);
  }

  render() {
    return (
      <div>
        <h3>Create New Card</h3>
        <CardForm
          {...this.props}
          onHandleSubmit={(formObj) => this.handleFormSubmit(formObj)}
        />
      </div>
    );
  }
}

export default CardNewForm;