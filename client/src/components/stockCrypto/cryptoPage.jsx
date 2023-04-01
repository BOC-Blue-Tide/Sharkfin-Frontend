import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Graph from './graph.jsx'
import TimeRange from './timeRange.jsx'
import Description from './description.jsx'
import CryptoState from './cryptoStats.jsx'
import Order from './orderForm/orderTab.jsx'
import LivePriceDisplay from './livePriceDisplay.jsx'

const cryptoPage = (props) => {

  var coinMeta = props.coinMeta
  var coinBarData = props.coinBarData
  var coinToday = props.coinToday
  var coinPrevious = props.coinPrevious
  var currentSymbol = props.currentSymbol
  const pageType = 'crypto'

  const [errMsg, setErrMsg] = useState(null)
  const [liveData, setLiveData] = useState('')
  const [change, setChange] = useState('')
  const [priceHolder, setPriceHolder] = useState('')
  const [defaultPrice, setDefaultPrice] = useState(false)
  useEffect(() => {
    if (liveData.length === 0 && props.coinToday !== null) {
      setPriceHolder(coinToday.close)
    }

  }, [props.coinToday])

  useEffect(() => {
    if (props.currentSymbol) {
      getLiveCryptoData(props.currentSymbol)
    }
  }, [props.currentSymbol])

  useEffect(() => {
    setErrMsg(props.errorMsg)
  }, [props.errorMsg])


  const getLiveCryptoData = (symbolInput) => {
    var symbol = symbolInput + 'USD'

    const socket = new WebSocket('wss://stream.data.alpaca.markets/v1beta1/crypto');

    console.info('1. New websocket created.');

    // Connection opened -> Subscribe
    socket.onopen = (event) => {
      socket.send(JSON.stringify({ 'action': 'auth', 'key': `${process.env.REACT_APP_ALPACA_KEY1}`, 'secret': `${process.env.REACT_APP_ALPACA_SECRET1}` }))
      socket.send(JSON.stringify({ "action": 'subscribe', "bars": [`${symbol}`] }))

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
      //console.log(response)
      // if (response.type === 'ping') {
      //   console.warn('Occasional server', response.type + '.');
      //   let pong = { "type": "pong" }
      //   socket.send(JSON.stringify(pong))
      // } else {
      if (response[0].S === symbol) {
        setDefaultPrice(true)
        setLiveData(response)
      }

      // }

    };

    // Unsubscribe
    var unsubscribe = function (symbol) {
      socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
    }
  }

  return (
    <>
      {props.coinMeta && props.coinBarData ? (

        <>
          <div className="stock-name">{coinMeta[0].name}</div>
          {/* <div className="live-price">live price</div> */}
          {defaultPrice ? <LivePriceDisplay liveData={liveData} /> : <div className="live-price">{`${priceHolder}`}</div>}

          <Graph coinBarData={props.coinBarData} liveData={liveData} pageType={'crypto'} />
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