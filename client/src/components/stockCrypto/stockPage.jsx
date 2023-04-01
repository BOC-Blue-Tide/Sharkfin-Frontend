import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Graph from './graph.jsx'
import TimeRange from './timeRange.jsx'
import Description from './description.jsx'
import Stats from './stats.jsx'
import Order from './orderForm/orderTab.jsx'
import LivePriceDisplay from './livePriceDisplay.jsx'


const stockPage = (props) => {
  var stockObj = props.stockObj
  var qouteData = props.qouteData
  const [errMsg, setErrMsg] = useState(null)
  const [change, setChange] = useState('')
  const [liveData, setLiveData] = useState(null)

  useEffect(() => {
    if (props.symbol !== null && props.stockObj) {
      if (Object.keys(stockObj).length > 0) {
        getLiveData(props.symbol)
      }
    }

  }, [props.stockObj])


  useEffect(() => {
    let qouteData = props.qouteData
    if (qouteData) {
      let change = parseFloat(qouteData['09. change']).toFixed(2)

      if (change > 0) {
        setChange(`$+${change} `)
      }
      else {
        setChange(`$${change}`)
      }
    }
  }, [props.qouteData])


  useEffect(() => {
    setErrMsg(props.errorMsg)
  }, [props.errorMsg])


  const getLiveData = (symbol) => {
    const socket = new WebSocket('wss://ws.finnhub.io?token=cgjjrr1r01qt0jk13m7gcgjjrr1r01qt0jk13m80');

    console.info('1. New websocket created.');

    // Connection opened -> Subscribe
    socket.onopen = (event) => {
      socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }))

      console.info('2. Subscribing to symbols...');

    };

    // Listen for messages from the websocket stream...
    socket.onmessage = (event) => {

      // console.clear();
      // console.info('1. New websocket created.');
      // console.info('2. Subscribing to symbols...');
      // console.info('3. Websocket streaming.');

      // stream response...
      let response = JSON.parse(event.data);

      if (response.type === 'ping') {
        console.warn('Occasional server', response.type + '.');
        let pong = { "type": "pong" }
        socket.send(JSON.stringify(pong))
      } else {
        var data = response.data || null
        console.log(data)
        setLiveData(data)
      }

    };

    // Unsubscribe
    var unsubscribe = function (symbol) {
      socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
    }
  }

  return (
    <>
      {props.stockObj && props.barData && props.qouteData ? (
        <>
          <Stack direction="row" spacing={1}>
            <Chip label={`${stockObj.Sector}`} />
            <Chip label={`${stockObj.Industry}`} />
          </Stack>
          <div className="stock-name">{stockObj.Name}</div>
          <LivePriceDisplay liveData={liveData} />
          <div className="today-change">{change} (${parseFloat(qouteData['10. change percent']).toFixed(2)}%) Today</div>

          <Graph barData={props.barData} liveData={liveData} pageType={'stock'} />
          <TimeRange handleTimeRangeClick={props.handleTimeRangeClick} />
          <Description stockObj={stockObj} />
          <Stats stockObj={stockObj} barData={props.barData} qouteData={props.qouteData} />
        </>
      ) : (<div>{!errMsg ? null : <p className='errorTxt'>
        <span>{errMsg}...&#128517;</span></p>}</div>
      )}

    </>


  )

}
export default stockPage

