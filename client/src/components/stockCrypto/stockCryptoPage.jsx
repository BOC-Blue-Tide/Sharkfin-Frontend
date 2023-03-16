import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Graph from './graph.jsx'
import TimeRange from './timeRange.jsx'
import Description from './description.jsx'
import Stats from './stats.jsx'
import Order from './orderForm/orderTab.jsx'

const stockCryptoPage = (props) => {
  const fallback = 'Data unavailable'
  var stockObj = props.stockObj



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
              <TimeRange handleTimeRangeClick={props.handleTimeRangeClick} />
              <Description stockObj={stockObj} />
              <Stats stockObj={stockObj} barData={props.barData} qouteData={props.qouteData} />


            </Grid>
            <Grid item xs={4}>
              <Order handleOrderClick={props.handleOrderClick} />
            </Grid>
          </Grid>
        </div> : fallback}
      <Order handleOrderClick={props.handleOrderClick} />
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