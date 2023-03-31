import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Graph from './graph.jsx'
import TimeRange from './timeRange.jsx'
import Description from './description.jsx'
import CryptoState from './cryptoStats.jsx'
import Order from './orderForm/orderTab.jsx'

const cryptoPage = (props) => {

  var coinMeta = props.coinMeta
  var coinBarData = props.coinBarData
  var coinToday = props.coinToday
  var coinPrevious = props.coinPrevious
  const pageType = 'crypto'

  const [errMsg, setErrMsg] = useState(null)
  const [liveData, setLiveData] = useState('')
  const [change, setChange] = useState('')

  // useEffect(() => {
  //   let coinLiveData = props.coinLiveData
  //   if (coinLiveData) {
  //     if (coinLiveData.length > 0) {
  //       console.log('set live price later')
  //       //setLivePrice(`$${parseFloat(coinLiveData[0].p).toFixed(2)}`)
  //     }
  //   }
  // }, [props.coinLiveData])

  useEffect(() => {
    setErrMsg(props.errorMsg)
  }, [props.errorMsg])


  // const getLiveCryptoData = (symbol) => {
  //   const socket = new WebSocket('wss://ws.finnhub.io?token=');

  //   console.info('1. New websocket created.');

  //   // Connection opened -> Subscribe
  //   socket.onopen = (event) => {
  //     socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }))

  //     console.info('2. Subscribing to symbols...');

  //   };

  //   // Listen for messages from the websocket stream...
  //   socket.onmessage = (event) => {

  //     // console.clear();
  //     // console.info('1. New websocket created.');
  //     // console.info('2. Subscribing to symbols...');
  //     // console.info('3. Websocket streaming.');

  //     // stream response...
  //     let response = JSON.parse(event.data);

  //     if (response.type === 'ping') {
  //       console.warn('Occasional server', response.type + '.');
  //       let pong = { "type": "pong" }
  //       socket.send(JSON.stringify(pong))
  //     } else {
  //       var data = response.data || null
  //       console.log(data)
  //       setLiveData(data)
  //     }

  //   };

  //   // Unsubscribe
  //   var unsubscribe = function (symbol) {
  //     socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
  //   }
  // }

  return (
    <>
      {props.coinMeta && props.coinBarData ? (

        <>
          <div className="stock-name">{coinMeta[0].name}</div>
          <div className="live-price">live price</div>
          <div className="today-change">{change} ($_.__%) Today</div>

          <Graph coinBarData={props.coinBarData} />
          <TimeRange handleTimeRangeClick={props.handleTimeRangeClick} />
          <Description coinMeta={coinMeta} />
          <CryptoState coinToday={coinToday} coinPrevious={coinPrevious} />

        </>
      ) : (<div>{!errMsg ? null : <p className='errorTxt'>
        <span>{errMsg}...&#128517;</span></p>}</div>)}
    </>
  )


}

export default cryptoPage