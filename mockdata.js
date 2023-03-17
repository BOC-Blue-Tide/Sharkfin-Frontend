let mockDatahis = [
  {
    stock: 'AAPL',
    transactionType: 'buy',
    datetime: 'Mar 2, 2023 1:30 PM',
    quantity: 10,
    price: '150.59 USD',
    status: 'complete'
  },
  {
    stock: 'NVO',
    transactionType: 'buy',
    datetime: 'Feb 22, 2023 1:30 PM',
    quantity: 20,
    price: '142.35 USD',
    status: 'complete'
  },
  {
    stock: 'TSLA',
    transactionType: 'buy',
    datetime: 'Feb 21, 2023 1:30 PM',
    quantity: 10,
    price: '172.19 USD',
    status: 'complete'
  },
  {
    stock: 'ABT',
    transactionType: 'buy',
    datetime: 'Feb 21, 2023 12:45 PM',
    quantity: 30,
    price: '97.75 USD',
    status: 'complete'
  },
];

var mockPortfolioData = [
  {
    symbol: 'GOOGL',
    name: 'ALPHABET INC CAP STK CL A',
    lastPrice: 93.65,
    gainLossPer: -1.59,
    gainLossDol: -268.78,
    accountPer: 15,
    qty: 178,
    avgCost: 95.16
  },
  {
    symbol: 'TSLA',
    name: 'TESLA INC COM',
    lastPrice: 197.79,
    gainLossPer: -0.47,
    gainLossDol: -76.46,
    accountPer: 15,
    qty: 83,
    avgCost: 198.71
  },
  {
    symbol: 'AMZN',
    name: 'AMAZON.COM INC',
    lastPrice: 94.90,
    gainLossPer: -0.39,
    gainLossDol: -176.34,
    accountPer: 20,
    qty: 219,
    avgCost: 96.34
  }
];

var mockHistory = {
  GOOGL : [{
      "date": "3/8/2023",
      "price": "100.00",
      "time": "09:00:00"
    }, {
      "date": "3/8/2023",
      "price": "96.54",
      "time": "09:10:00"
    }, {
      "date": "3/8/2023",
      "price": "98.88",
      "time": "09:20:00"
    }, {
      "date": "3/8/2023",
      "price": "97.13",
      "time": "09:30:00"
    }, {
      "date": "3/8/2023",
      "price": "91.68",
      "time": "09:40:00"
    }, {
      "date": "3/8/2023",
      "price": "91.40",
      "time": "09:50:00"
    }, {
      "date": "3/8/2023",
      "price": "90.04",
      "time": "10:00:00"
    }, {
      "date": "3/8/2023",
      "price": "96.96",
      "time": "10:10:00"
    }, {
      "date": "3/8/2023",
      "price": "91.61",
      "time": "10:20:00"
    }, {
      "date": "3/8/2023",
      "price": "90.77",
      "time": "10:30:00"
    }, {
      "date": "3/8/2023",
      "price": "98.49",
      "time": "10:40:00"
    }, {
      "date": "3/8/2023",
      "price": "96.25",
      "time": "10:50:00"
    }, {
      "date": "3/8/2023",
      "price": "92.38",
      "time": "11:00:00"
    }, {
      "date": "3/8/2023",
      "price": "96.13",
      "time": "11:10:00"
    }, {
      "date": "3/8/2023",
      "price": "90.09",
      "time": "11:20:00"
    }, {
      "date": "3/8/2023",
      "price": "92.71",
      "time": "11:30:00"
    }, {
      "date": "3/8/2023",
      "price": "95.17",
      "time": "11:40:00"
    }, {
      "date": "3/8/2023",
      "price": "99.63",
      "time": "11:50:00"
    }, {
      "date": "3/8/2023",
      "price": "96.46",
      "time": "12:00:00"
    }, {
      "date": "3/8/2023",
      "price": "91.73",
      "time": "12:10:00"
    }, {
      "date": "3/8/2023",
      "price": "94.47",
      "time": "12:20:00"
    }, {
      "date": "3/8/2023",
      "price": "98.48",
      "time": "12:30:00"
    }, {
      "date": "3/8/2023",
      "price": "96.30",
      "time": "12:40:00"
    }, {
      "date": "3/8/2023",
      "price": "90.19",
      "time": "12:50:00"
    }, {
      "date": "3/8/2023",
      "price": "90.59",
      "time": "13:00:00"
    }, {
      "date": "3/8/2023",
      "price": "97.73",
      "time": "13:10:00"
    }, {
      "date": "3/8/2023",
      "price": "96.15",
      "time": "13:20:00"
    }, {
      "date": "3/8/2023",
      "price": "95.82",
      "time": "13:30:00"
    }, {
      "date": "3/8/2023",
      "price": "93.38",
      "time": "13:40:00"
    }, {
      "date": "3/8/2023",
      "price": "92.27",
      "time": "13:50:00"
    }, {
      "date": "3/8/2023",
      "price": "93.42",
      "time": "14:00:00"
    }, {
      "date": "3/8/2023",
      "price": "99.53",
      "time": "14:10:00"
    }, {
      "date": "3/8/2023",
      "price": "97.17",
      "time": "14:20:00"
    }, {
      "date": "3/8/2023",
      "price": "91.63",
      "time": "14:30:00"
    }, {
      "date": "3/8/2023",
      "price": "96.06",
      "time": "14:40:00"
    }, {
      "date": "3/8/2023",
      "price": "99.30",
      "time": "14:50:00"
    }, {
      "date": "3/8/2023",
      "price": "98.69",
      "time": "15:00:00"
    }, {
      "date": "3/8/2023",
      "price": "98.83",
      "time": "15:10:00"
    }, {
      "date": "3/8/2023",
      "price": "91.39",
      "time": "15:20:00"
    }, {
      "date": "3/8/2023",
      "price": "91.44",
      "time": "15:30:00"
    }, {
      "date": "3/8/2023",
      "price": "94.35",
      "time": "15:40:00"
    }, {
      "date": "3/8/2023",
      "price": "95.91",
      "time": "15:50:00"
    }]
};


module.exports = { mockPortfolioData, mockHistory, mockDatahis };
