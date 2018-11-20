import React from 'react';
import ReactTable from "react-table";
import moment from 'moment';

import { tableColumns } from './constants';

const TransactionTable = ( ({transactions}) => {
  const displayData = transactions.map(transaction => {
    return {
      date: moment(transaction.date).format('MM/DD/YYYY'),
      amount: Number(transaction.amount).toFixed(2),
      category: transaction.category,
      merchant: transaction.merchant
    };
  });

  return (
    <div className="tableContainer">
      <ReactTable
        columns={tableColumns}
        data={displayData}
        defaultPageSize={20}
      />
    </div>
  );
});

export default TransactionTable;
