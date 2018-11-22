import React, { Component } from 'react';

import { sendRequestAuth } from '../../AuthService';
import PerkForm from './PerkForm';

class PerkNewForm extends Component {

  handleFormSubmit = async (body) => {
    try {
      const response = await sendRequestAuth("/perks", 'post', {
        perk: body
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return(
      <PerkForm 
        onHandleSubmit={this.handleFormSubmit}
      />
    );
  }
};

export default PerkNewForm;
