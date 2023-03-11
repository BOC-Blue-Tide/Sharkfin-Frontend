//where I would map out each transaction
import Transactions from './Transactions.jsx';

function TransactionList(props) {

let transactionMap = props.data.map((element, index) => {
  return <Transactions key={index} data={element} />
})

return <>
<h1>Recent Transaction History</h1>
<hr></hr>
{transactionMap}
</>
}
export default TransactionList;