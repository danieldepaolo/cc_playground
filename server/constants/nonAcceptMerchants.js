const nonAcceptMerchants = [{
    name: 'Costco',
    otherNames: ['Costco Gas'],
    creditAccepted: true,
    processorAcceptance: {
        amex: false,
        discover: false,
        visa: true,
        mc: false
    }
  }
];

module.exports = {
  nonAcceptMerchants: nonAcceptMerchants
};