import React, { Component } from 'react';

import CardForm from './CardForm';

class CardNewForm extends Component {
  handleFormSubmit = async (formObj) => {
    const url = "http://localhost:8080/cards";

    // Some cleanup of the body data
    formObj.selectedPerks = Array.from(formObj.selectedPerks);
    if (!formObj.signupBonusActive) {
      formObj.signupBonus = null;
    }

    console.log(formObj);
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({card: formObj})
    });

    const data = await response.json();
    console.log(data);
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