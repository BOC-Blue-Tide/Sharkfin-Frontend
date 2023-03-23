import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Graph from './graph.jsx'
import TimeRange from './timeRange.jsx'
import Description from './description.jsx'
import Stats from './stats.jsx'
import Order from './orderForm/orderTab.jsx'

const cryptoPage = (props) => {

  var coinMeta = props.coinMeta
  var coinBarData = props.coinBarData
  const pageType = 'crypto'

  const [errMsg, setErrMsg] = useState(null)
  const [livePrice, setLivePrice] = useState('')
  const [change, setChange] = useState('')

  useEffect(() => {
    let coinLiveData = props.coinLiveData
    if (coinLiveData) {
      if (coinLiveData.length > 0) {
        console.log('set live price later')
        //setLivePrice(`$${parseFloat(coinLiveData[0].p).toFixed(2)}`)
      }
    }
  }, [props.coinLiveData])

  useEffect(() => {
    setErrMsg(props.errorMsg)
  }, [props.errorMsg])

  return (
    <>
      {props.coinMeta && props.coinBarData ? (
        <div className="page-content">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className="stock-name">{coinMeta[0].name}</div>
              <div className="live-price">live price</div>
              <div className="today-change">{change} ($_.__%) Today</div>

              <Graph coinBarData={props.coinBarData} />
              <TimeRange handleTimeRangeClick={props.handleTimeRangeClick} />
              <Description coinMeta={coinMeta} />
              {/* <Stats /> */}


            </Grid>
            <Grid item xs={4}>
              <Order handleOrderClick={props.handleOrderClick} pageType={pageType} />
            </Grid>
          </Grid>
        </div>) : (<div>{!errMsg ? null : <p className='errorTxt'>
          <span>{errMsg}...&#128517;</span></p>}</div>)}
    </>
  )


}

export default cryptoPage