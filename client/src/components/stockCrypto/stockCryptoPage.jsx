import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Graph from './graph.jsx'
import moment from 'moment-timezone'

const stockCryptoPage = (props) => {

  const fallback = 'Data unavailable'
  var stockObj = props.stockObj || fallback



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
      timeframe = '1Day'
    } else if (time === '1m') {
      startTime = startTime.subtract(1, 'months')
      timeframe = '1Day'
    } else if (time === '3m') {
      startTime = startTime.subtract(3, 'months')
      timeframe = '1Day'
    } else if (time === '5y') {
      startTime = startTime.subtract(5, 'years')
      timeframe = '1Month'
    }
    // console.log(startTime.toISOString())
    props.handleTimeRangeClick(startTime.toISOString(), timeframe)
  }

  return (
    <>
      {props.stockObj ?
        <div className="page-content">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack direction="row" spacing={1}>
                <Chip label={`${stockObj.Sector}`} variant="outlined" />
                <Chip label={`${stockObj.Industry}`} variant="outlined" />
              </Stack>
              <div className="stock-name">{stockObj.Name}</div>
              <div className="live-price">live price</div>
              <div className="today-change">{`change (change percentage) Today`}</div>
              <div className="after-change">{`change (change percentage) After hours`}</div>

              <Graph barData={props.barData} />
              <Stack direction="row" spacing={1}>
                <Chip label={`1D`} variant="outlined" data-time={'1d'} onClick={handleTimeClick} />
                <Chip label={`1W`} variant="outlined" data-time={'1w'} onClick={handleTimeClick} />
                <Chip label={`1M`} variant="outlined" data-time={'1m'} onClick={handleTimeClick} />
                <Chip label={`3M`} variant="outlined" data-time={'3m'} onClick={handleTimeClick} />
                <Chip label={`5Y`} variant="outlined" data-time={'5y'} onClick={handleTimeClick} />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              FSF
            </Grid>
          </Grid>
        </div> : null}
    </>


  )

}
export default stockCryptoPage


{/* <div className="page-container">
<Stack direction="row" spacing={1}>
  <Chip label={`${stockObj.Sector}`} variant="outlined" />
</Stack>
<div className="stock-name">{stockObj.Name}</div>
<div className="live-price">live price</div>
<div className="today-change">{`change (change percentage) Today`}</div>
<div className="after-change">{`change (change percentage) After hours`}</div>

<div></div>

</div> */}