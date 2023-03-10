import React from 'react';
import Axios from 'axios'
import SearchBar from './searchBar.jsx'
import StockCryptoPage from './stockCryptoPage.jsx'
import helpers from './helperFunctions/requestHelpers.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',// can be dynaimc if offers currency selection
      stockObj: {},
      liveData: {},
      errorMsg: ''
    }
  }
  async getStockData(input, scope, operation) {
    var symbol = input.toUpperCase()
    if (operation === 'search') {
      if (scope === 'stock') {
        try {
          this.getLiveData(symbol)
          var symbolData = await helpers.symbolLookup(symbol)
            .then(async (symbolData) => {

              console.log(symbolData.data)
              this.setState({ stockObj: symbolData.data })

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

  getLiveData(symbol) {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB}`);
    socket.onopen = (event) => {
      socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }))
    };

    socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
      this.setState({ liveData: event.data })
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
        <SearchBar getStockData={this.getStockData.bind(this)} />

        <StockCryptoPage liveData={this.state.liveData} stockObj={this.state.stockObj} errorMsg={this.state.errorMsg} />
      </>
    )
  }
}

export default App;