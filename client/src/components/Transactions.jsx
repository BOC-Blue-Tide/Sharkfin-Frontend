import React, {useState} from 'react';

function Transactions(props) {
  const [isHidden, setExpandView] = useState(true);

  function onClick(e) {
    setExpandView(!isHidden);
  }

  let mockData = {
    stock: 'TSLA',
    transactionType: 'buy',
    datetime: 'Feb 21, 2023 1:30 PM',
    quantity: 10,
    price: '295.19 USD',
    status: 'complete'
  }

  let transactionInfo = null;
  if (!isHidden) {
    transactionInfo = <div>
    <div className='transaction'>Transaction type <span>{mockData.transactionType}</span></div>
  <div className='transaction'>Date <span>{mockData.datetime}</span></div>
  <hr></hr>
  <div className='transaction'>Quantity <span>{mockData.quantity}</span></div>
  <div className='transaction'>Price <span>{mockData.price}</span></div>
  <hr></hr>
  <div className='transaction'>Total Price <span>{(mockData.price.slice(0,-4) * mockData.quantity).toFixed(2) + ' USD'}</span></div>
  <div className='transaction'>Status <span>{mockData.status}</span></div>
    </div>;
  }


  return <>
  <h1>Recent Transaction History</h1>
  <hr></hr>
  <h2 className='transaction'>{mockData.stock}<button onClick={onClick}>Expand/Hide</button></h2>
  {transactionInfo}
  </>
}

export default Transactions;