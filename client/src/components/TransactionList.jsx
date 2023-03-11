import Transactions from './Transactions.jsx';
import { Button } from '@mui/material';

function TransactionList(props) {

let transactionMap = props.data.map((element, index) => {
  return <Transactions key={index} data={element} />
})

return <>
<h1>Recent Transaction History</h1>
<hr></hr>
{transactionMap}
<br></br>
<Button variant="outlined">See More</Button>
</>
}
export default TransactionList;