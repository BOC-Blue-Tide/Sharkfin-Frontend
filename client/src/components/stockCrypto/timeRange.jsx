import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import moment from 'moment-timezone'
const timeRange = (props) => {


  const handleTimeClick = (e) => {
    const { time } = e.currentTarget.dataset
    var startTime = moment()
    var timeframe;
    //console.log(startTime)
    if (time === '1d') {
      startTime = startTime.subtract(1, 'days')
      timeframe = '5Min'
    } else if (time === '1w') {
      startTime = startTime.subtract(7, 'days')
      timeframe = '10Min'
    } else if (time === '1m') {
      startTime = startTime.subtract(1, 'months')
      timeframe = '60Min'
    } else if (time === '3m') {
      startTime = startTime.subtract(3, 'months')
      timeframe = '60Min'
    } else if (time === '1y') {
      startTime = startTime.subtract(3, 'months')
      timeframe = '1Day'
    } else if (time === '5y') {
      startTime = startTime.subtract(5, 'years')
      timeframe = '1Week'
    }
    // console.log(startTime.toISOString())
    props.handleTimeRangeClick(startTime.toISOString(), timeframe)
  }

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={`1D`} variant="outlined" data-time={'1d'} onClick={handleTimeClick} />
      <Chip label={`1W`} variant="outlined" data-time={'1w'} onClick={handleTimeClick} />
      <Chip label={`1M`} variant="outlined" data-time={'1m'} onClick={handleTimeClick} />
      <Chip label={`3M`} variant="outlined" data-time={'3m'} onClick={handleTimeClick} />
      <Chip label={`1Y`} variant="outlined" data-time={'1y'} onClick={handleTimeClick} />
      <Chip label={`5Y`} variant="outlined" data-time={'5y'} onClick={handleTimeClick} />
    </Stack>
  )

}

export default timeRange