import React, { Component } from 'react';
import _ from 'underscore';
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react';
import ReactTable from "react-table";
import moment from 'moment'

import { Dimmer, Loader, List, Label } from 'semantic-ui-react';
import { tableColumns } from './constants';

const BonusContainer = styled.div`
  height: 100%;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 1em;
  border-radius: 5px;
`;

const BonusSummary = styled(Grid)`
  height: 30%;
`;

const BonusTableContainer = styled(Grid)`
  height: 70%;
`;

class BonusReport extends Component {
  formatTableData() {
    const { bonusReport } = this.props;
    const data = bonusReport.transactionInfo.map(transaction => ({
      date: moment(transaction.transaction.date).format('MM/DD/YYYY'),
      merchant: transaction.transaction.merchant,
      category: transaction.transaction.category,
      amount: Number(transaction.transaction.amount).toFixed(2),
      cardName: transaction.cardUsed.name,
      bonusValue: Number(transaction.bonusValue).toFixed(2)
    }));
    return data;
  }

  render() {
    const { loading, bonusReport } = this.props;
    console.log(bonusReport);

    return (
      <BonusContainer>
        <BonusSummary columns={1}>
          <Grid.Column width={16}>
            <h3>Bonus Report</h3>
            <div className="bonusBox">
              <Dimmer active={loading}>
                <Loader />
              </Dimmer>
              <p className="bonus">
                One Year Bonus: ${Number(bonusReport ? bonusReport.totalBonusValue : 0).toFixed(2)}
              </p>
            </div>
            <List>
              {_.keys(bonusReport ? bonusReport.currencyEarned : {}).map(currency => (
                <List.Item key={currency}>
                  <Label>{currency}</Label> {Math.floor(bonusReport.currencyEarned[currency])}
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </BonusSummary>
        <hr />
        <BonusTableContainer columns={1}>
          <Grid.Column width={16}>
            <ReactTable
              columns={tableColumns}
              data={bonusReport ? this.formatTableData(bonusReport) : []}
            />
          </Grid.Column>
        </BonusTableContainer>
      </BonusContainer>
    );
  }
};

export default BonusReport;
