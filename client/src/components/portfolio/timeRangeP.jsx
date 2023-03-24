import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
const timeRangeP = (props) => {

  const handleTimeClick = (e) => {
    const { time } = e.currentTarget.dataset
    var timeWindow;
    //console.log(startTime)
    if (time === '1D') {
      timeWindow = '1D'
    } else if (time === '1W') {
      timeWindow = '1W'
    } else if (time === '1M') {
      timeWindow = '1M'
    } else if (time === '3M') {
      timeWindow = '3M'
    } else if (time === '1Y') {
      timeWindow = '1Y'
    } else if (time === '5Y') {
      timeWindow = '5Y'
    }
    // console.log(startTime.toISOString())
    props.handleTimeWindowClick(timeWindow);
  }

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={`1D`} variant="outlined" data-time={'1D'} onClick={handleTimeClick} />
      <Chip label={`1W`} variant="outlined" data-time={'1W'} onClick={handleTimeClick} />
      <Chip label={`1M`} variant="outlined" data-time={'1M'} onClick={handleTimeClick} />
      <Chip label={`3M`} variant="outlined" data-time={'3M'} onClick={handleTimeClick} />
      <Chip label={`1Y`} variant="outlined" data-time={'1Y'} onClick={handleTimeClick} />
      <Chip label={`5Y`} variant="outlined" data-time={'5Y'} onClick={handleTimeClick} />
    </Stack>
  )

}

export default timeRangeP;