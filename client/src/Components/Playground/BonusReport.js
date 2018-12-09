import React, { Component } from 'react';
import { Dimmer, Loader, List, Label } from 'semantic-ui-react';
import _ from 'underscore';

class BonusReport extends Component {
  render() {
    const { loading, bonusReport } = this.props;
    console.log(bonusReport);

    return (
      <div>
        <h3>Bonus Report</h3>
        {bonusReport && (
          <div>
            <div className="bonusBox">
              <Dimmer active={loading}>
                <Loader />
              </Dimmer>
              <p className="bonus">One Year Bonus: ${Number(bonusReport.totalBonusValue).toFixed(2)}</p>
            </div>
            <List>
              {_.keys(bonusReport.currencyEarned).map(currency => (
                <List.Item key={currency}>
                  <Label>{currency}</Label> {Math.floor(bonusReport.currencyEarned[currency])}
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }
};

export default BonusReport;
