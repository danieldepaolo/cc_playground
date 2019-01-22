export const tableColumns = [{
  Header: 'Date',
  accessor: 'date',
  width: 100,
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
  width: 90,
  sortMethod: (a, b, desc) => {
    return Number(a) - Number(b);
  }
}, {
  Header: 'Card used',
  accessor: 'cardName'
}, {
  Header: 'Bonus ($)',
  width: 90,
  accessor: 'bonusValue',
  sortMethod: (a, b, desc) => {
    return Number(a) - Number(b);
  }
}];