import React, { Component } from 'react';
import axios from 'axios';
import CurrencyForm from './CurrencyForm';

import { sendRequestAuth } from '../../AuthService';

class CurrencyEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount = async () => {
    const { match: {params} } = this.props;
    const response = await axios(`/currencies/${params.id}`);
    this.setState({data: response.data.currency});
  }

  handleFormSubmit = async (body) => {
    const { match: {params} } = this.props;
    const response = await sendRequestAuth(`/currencies/${params.id}`, 'put', {
      currency: body
    });

    console.log(response);
  }

  render() {
    const { data } = this.state;

    return data && (
      <CurrencyForm
        initialState={data}
        onHandleSubmit={this.handleFormSubmit}
      />
    )
  }
};

export default CurrencyEditForm;
