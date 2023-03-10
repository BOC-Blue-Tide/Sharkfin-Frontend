import React from 'react';
import TransactionList from './TransactionList.jsx';

let mockData = [
  {
    stock: 'TSLA',
    transactionType: 'buy',
    datetime: 'Feb 21, 2023 1:30 PM',
    quantity: 10,
    price: '295.19 USD',
    status: 'complete'
  },
  {
    stock: 'TSLA',
    transactionType: 'buy',
    datetime: 'Feb 21, 2023 1:30 PM',
    quantity: 10,
    price: '295.19 USD',
    status: 'complete'
  },
  {
    stock: 'TSLA',
    transactionType: 'buy',
    datetime: 'Feb 21, 2023 1:30 PM',
    quantity: 10,
    price: '295.19 USD',
    status: 'complete'
  },
  {
    stock: 'TSLA',
    transactionType: 'buy',
    datetime: 'Feb 21, 2023 1:30 PM',
    quantity: 10,
    price: '295.19 USD',
    status: 'complete'
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      Hello Worldsss
      <TransactionList data={mockData}/>
      </>
    )
  }
}

export default App;