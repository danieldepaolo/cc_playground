import React, { Component } from 'react';
import Loader from 'react-loader';
import classNames from 'classnames';

class BonusBox extends Component {
  render() {
    const { loading, bonus } = this.props;

    const bonusBoxClass = classNames({
      bonusBox: true,
      loadingDimmer: loading
    });

    return (
      <div className={bonusBoxClass}>
        <Loader
          loaded={!loading}
          length={5}
          width={3}
          radius={5}
        >
        </Loader>
        <p className="bonus">Bonus: {bonus}</p>
      </div>
    );
  }
};

export default BonusBox;
