export const tableColumns = [{
  Header: 'Date',
  accessor: 'date',
  width: 120,
  sortMethod: (a, b, desc) => {
    return Date(a) - Date(b);
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