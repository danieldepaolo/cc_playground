import React, { Component } from 'react';
import axios from 'axios';

import CurrencyForm from './CurrencyForm';

class CurrencyNewForm extends Component {

  handleFormSubmit = async (body) => {
    const response = await axios.post("/currencies", {
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