import Transactions from './Transactions.jsx';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

function TransactionList(props) {

const [recentTrans, setSeeMoreTrans] = useState(5);
const [filter, setFilter] = useState('recent');
const [transArray, setTransArray] = useState(props.data);

let shownArray = transArray.slice(0, recentTrans);

const handleSeeMore = function(e) {
  setSeeMoreTrans(recentTrans + 5);
}

const handleFilter = (e) => {
  if (e.target.value === 'recent') {
    setFilter(e.target.value);
    setTransArray(props.data);
  } else {
    setFilter(e.target.value);
    setTransArray(props.data.filter(element => element.transactionType === e.target.value));
  }
};

let seeMoreButton = <Button onClick={handleSeeMore} variant="outlined">See More</Button>
if (shownArray.length === transArray.length) {
  seeMoreButton = <div>You've reached the end!</div>
}

let transactionMap = shownArray.map((element, index) => {
  return <Transactions key={index} data={element} />
});

return <>
<h1>Recent Transaction History</h1>
<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Filter</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={filter}
        label="Filter"
        onChange={handleFilter}
      >
        <MenuItem value='recent'>Most Recent</MenuItem>
        <MenuItem value='buy'>Buy</MenuItem>
        <MenuItem value='sell'>Sell</MenuItem>
      </Select>
    </FormControl>
<hr></hr>
{transactionMap}
<br></br>
{seeMoreButton}
</>
}
export default TransactionList;