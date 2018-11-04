import React from 'react';
import ReactTable from "react-table";

const columns = [{
  Header: 'Date',
  accessor: 'date',
  width: 100
}, {
  Header: 'Merchant',
  accessor: 'merchant',
  filterable: true
}, {
  Header: 'Category',
  accessor: 'category',
  filterable: true
}, {
  Header: 'Amount',
  accessor: 'amount',
  width: 80
}];

const TransactionTable = ( ({transactions}) => {
  return (
    <div className="tableContainer">
      <ReactTable
        columns={columns}
        data={transactions}
        defaultPageSize={20}
      />
    </div>
  );
});

export default TransactionTable;
