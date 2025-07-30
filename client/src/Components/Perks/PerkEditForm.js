import React, { Component } from 'react';
import axios from 'axios';

import { sendRequestAuth } from '../../AuthService';
import PerkForm from './PerkForm';

class PerkEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      perkData: null
    };
  }

  componentDidMount = async () => {
    const { match: {params} } = this.props;
    const response = await axios(`/perks/${params.id}`);
    this.setState({perkData: response.data.perk});
  }

  handleFormSubmit = async (body) => {
    const { match: {params} } = this.props;
    await sendRequestAuth(`/perks/${params.id}`, 'put', {
      perk: body
    });
  }

  render() {
    const { perkData } = this.state;

    return perkData && (
      <PerkForm
        initialState={perkData}
        onHandleSubmit={this.handleFormSubmit}
      />
    );
  }
};

export default PerkEditForm;
