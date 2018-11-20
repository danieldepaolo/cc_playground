import React, { Component } from 'react';
import axios from 'axios';

import PerkForm from './PerkForm';

class PerkNewForm extends Component {

  handleFormSubmit = async (body) => {
    const response = await axios.post("/perks", {
      perk: body
    });

    console.log(response);
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