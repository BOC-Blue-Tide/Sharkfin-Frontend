import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const dropDown = (props) => {

  const [type, setType] = useState('share');

  const handleChange = (event) => {
    setType(event.target.value);
    props.handleOrderIn(event)
  };

  return (
    <FormControl variant="standard" sx={{ m: 0 }}>
      {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
      <Select
        labelId="orderIn"
        id="orderIn"
        value={type}
        onChange={handleChange}
        label="type"
      >
        <MenuItem value={'share'}>Shares</MenuItem>
        <MenuItem value={'dollars'}>Dollars</MenuItem>

      </Select>
    </FormControl>

  )

}


export default dropDown

