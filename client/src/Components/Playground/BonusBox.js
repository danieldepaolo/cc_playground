import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

class BonusBox extends Component {
  render() {
    const { loading, bonus } = this.props;

    return (
      <div className="bonusBox">
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <p className="bonus">One Year Bonus: ${Number(bonus).toFixed(2)}</p>
      </div>
    );
  }
};

export default BonusBox;
