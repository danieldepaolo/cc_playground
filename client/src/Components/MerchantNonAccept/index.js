import React, { Component } from 'react';

import { sendRequestAuth } from '../../AuthService';

class MerchantNonAccept extends Component {
  state = {
    nonAcceptMerchants: []
  }

  async componentDidMount() {
    const {data: {nonAcceptMerchants}} = await sendRequestAuth('/nonacceptmerchants');
    this.setState({ nonAcceptMerchants: nonAcceptMerchants });
  }

  render() {
    return(
      <ul>
        {this.state.nonAcceptMerchants.map(merchant => (
          <li>{merchant.name}</li>
        ))}
      </ul>)
  }
}

export default MerchantNonAccept;
