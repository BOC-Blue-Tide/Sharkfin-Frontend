import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const dropDown = (props) => {

  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
    props.handleOrderIn(event)
  };

  return (
    <>
      {props.pageType === 'stock' ?
        <FormControl variant="standard" sx={{ m: 0 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="orderIn"
            id="orderIn"
            value={type}
            onChange={handleChange}
            label="type"
          >

            <MenuItem value={'shares'}>Shares</MenuItem>
            <MenuItem value={'dollars'}>Dollars</MenuItem>

          </Select>
        </FormControl>
        :
        <FormControl variant="standard" sx={{ m: 0 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="orderIn"
            id="orderIn"
            value={type}
            onChange={handleChange}
            label="type"
          >

            <MenuItem value={'coins'}>Coins</MenuItem>
            <MenuItem value={'dollars'}>Dollars</MenuItem>

          </Select>
        </FormControl>}
    </>
  )

}


export default dropDown

