function dateFromSlashStr(slashDate) {
  const dateItems = slashDate.split('/');
  const year = Number(dateItems[2]);
  const monthIndex = Number(dateItems[0]) - 1;
  const day = Number(dateItems[1]);

  return new Date(year, monthIndex, day);
}

function getNonDuplicateTransactions(existing, insertTransactions) {
  const fieldSets = {
    date: new Set(),
    merchant: new Set(),
    amount: new Set()
  };

  existing.forEach(transaction => {
    fieldSets.date.add(transaction.date.getTime());
    fieldSets.merchant.add(transaction.merchant);
    fieldSets.amount.add(transaction.amount);
  });

  let nonDuplicateTransactions = [];
  insertTransactions.forEach(transaction => {
    // Check if we already have this transaction in db
    if (!fieldSets.date.has(transaction.date.getTime()) ||
        !fieldSets.merchant.has(transaction.merchant) ||
        !fieldSets.amount.has(transaction.amount)
    ) {
      nonDuplicateTransactions.push(transaction);
    }
  });

  return nonDuplicateTransactions;
};

module.exports = {
  dateFromSlashStr: dateFromSlashStr,
  getNonDuplicateTransactions: getNonDuplicateTransactions
};
