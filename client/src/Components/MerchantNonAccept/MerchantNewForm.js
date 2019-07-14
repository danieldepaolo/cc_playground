import React, { Component } from 'react';

import { sendRequestAuth } from '../../AuthService';
import MerchantNonAcceptForm from './MerchantNonAcceptForm';

class MerchantNewForm extends Component {

  handleFormSubmit = async (body) => {
    try {
      const response = await sendRequestAuth("/nonacceptmerchants", 'post', {
        nonAcceptMerchant: body
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return(
      <MerchantNonAcceptForm 
        onHandleSubmit={this.handleFormSubmit}
      />
    );
  }
};

export default MerchantNewForm;
