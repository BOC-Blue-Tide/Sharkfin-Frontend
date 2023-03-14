import React from 'react';
import Axios from 'axios'
import SearchBar from './searchBar.jsx'
import StockCryptoPage from './stockCrypto/stockCryptoPage.jsx'
import helpers from './helperFunctions/requestHelpers.js'
import moment from 'moment-timezone'
const API_KEY = process.env.REACT_APP_ALPACA_ID;
const API_SECRET = process.env.REACT_APP_ALPACA_KEY;
const SOURCE = process.env.REACT_APP_ALPACA_SOURCE;
const defaultStartTime = moment().subtract(1, 'days').toISOString()
import TransactionList from './TransactionList.jsx';
import mockData from '../../../mockData.js';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',// can be dynaimc if offers currency selection
      stockObj: null,
      liveData: null,
      barData: null,
      qouteData: null,
      errorMsg: null,
      currentSymbol: null,
      start: defaultStartTime,
      timeframe: '5Min'
    }
  }

  componentDidMount() { // for development purpose only
    this.getStockData('msft', 'stock', 'search')
    this.getBarData('msft', this.state.start, this.state.timeframe)
  }

  handleTimeRangeClick(start, timeframe) {
    this.setState({ start: start, timeframe: timeframe }, async () => {
      this.getBarData('msft', this.state.start, this.state.timeframe) // replace 'msft' to this.state.currentSymbol
    })
  }

  async getStockData(input, scope, operation) {
    var symbol = input.toUpperCase()
    if (operation === 'search') {
      if (scope === 'stock') {
        try {
          this.setState({ symbol: symbol }, async () => {
            var symbolData = await helpers.symbolLookup(symbol)
              .then(async (symbolData) => {

                //console.log(symbolData.data)
                this.setState({ stockObj: symbolData.data })
                //this.getLiveData(symbol)
              })
              .then(async () => {
                var stockQoute = await helpers.getStockQoute(symbol)
                //console.log(stockQoute.data)
                this.setState({ qouteData: stockQoute.data['Global Quote'] })
              })
          })


        }
        catch (err) {
          console.log(err)
          this.setState({ errorMsg: 'Something went wrong.' })
        }
      } else if (scope === 'crypto') {
        console.log('i want btc')
      }
    }

  }

  async getBarData(symbol, start, timeframe) {
    try {

      var barData = await helpers.getBarData(symbol, start, timeframe)
      //console.log(barData)

      this.setState({ barData: barData })


    }
    catch (err) {
      console.log(err)
      this.setState({ errorMsg: 'Something went wrong.' })
    }
  }


  getLiveData(symbol) {
    const socket = new WebSocket(`wss://stream.data.alpaca.markets/v2/${SOURCE}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const message = data[0]['msg']
      console.log('Message from server ', data);

      if (message === 'connected') {
        socket.send(JSON.stringify({ "action": "auth", "key": `${API_KEY}`, "secret": `${API_SECRET}` }))
      }
      if (message === 'authenticated') {
        socket.send(JSON.stringify({ "action": "subscribe", "bars": [symbol] }))
      }
      // if (event.data === '{"type":"ping"}') {
      //   this.setState({ errorMsg: 'Sorry, live data unavailable.' })
      //   unsubscribe(symbol)
      //   socket.close()
      // } else {
      //   this.setState({ liveData: data })
      // }

    }

    socket.onerror = (event) => {
      unsubscribe(symbol)
      this.setState({ errorMsg: 'Sorry, live data unavailable.' })
      socket.close()
    }

    // Unsubscribe function to be called
    var unsubscribe = function (symbol) {
      socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
    }
  }

  render() {
    return (
      <>
        <SearchBar
          getStockData={this.getStockData.bind(this)} />

        <StockCryptoPage
          liveData={this.state.liveData}
          stockObj={this.state.stockObj}
          errorMsg={this.state.errorMsg}
          handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
          barData={this.state.barData}
          qouteData={this.state.qouteData} />
        {/* <TransactionList data={mockData}/> */}
      </>
    )
  }
}

export default App;