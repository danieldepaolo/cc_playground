import React, { Component } from 'react';

import CurrencyForm from './CurrencyForm';
import { sendRequestAuth } from '../../AuthService';

class CurrencyNewForm extends Component {

  handleFormSubmit = async (body) => {
    const response = await sendRequestAuth("/currencies", "post", {
      currency: body
    });

    console.log(response);
  }

  render() {
    return(
      <CurrencyForm 
        onHandleSubmit={this.handleFormSubmit}
      />
    );
  }
};

export default CurrencyNewForm;