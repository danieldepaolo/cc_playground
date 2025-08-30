export const tableColumns = [{
  Header: 'Date',
  accessor: 'date',
  width: 120,
  sortMethod: (a, b, desc) => {
    return new Date(a) - new Date(b);
  }
}, {
  Header: 'Merchant',
  accessor: 'merchant',
  filterable: true
}, {
  Header: 'Category',
  accessor: 'category',
  filterable: true
}, {
  Header: 'Amount ($)',
  accessor: 'amount',
  width: 120,
  sortMethod: (a, b, desc) => {
    return Number(a) - Number(b);
  }
}];

export const allowedFileTypes = ['text/csv', 'text/plain'];