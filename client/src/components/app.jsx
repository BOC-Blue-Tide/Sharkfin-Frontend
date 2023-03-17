import React from 'react';
import Axios from 'axios'
//Jason
import SearchBar from './searchBar.jsx'
import StockCryptoPage from './stockCrypto/stockCryptoPage.jsx'
import helpers from './helperFunctions/requestHelpers.js'
import moment from 'moment-timezone'
const API_KEY = process.env.REACT_APP_ALPACA_ID;
const API_SECRET = process.env.REACT_APP_ALPACA_KEY;
const SOURCE = process.env.REACT_APP_ALPACA_SOURCE;
const defaultStartTime = moment().subtract(1, 'days').toISOString()
//Jacinthe
import TransactionList from './TransactionList.jsx';
import mockData from '../../../mockData.js';
//Howard
import Portfolio from './portfolio/portfolio.jsx';
//Lenord
import LeaderBoard from './leaderboard/leaderboard.jsx'
//Daniel
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Route, Routes } from 'react-router-dom';
import AccountInfo from './accountInfo.jsx';
import Dashboard from './exampleComponent.jsx'
import Header from './header.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
  typography: {
    fontFamily: 'Inter, sans-Serif',
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'bold',
    },
  },
  components: {
    MuiCssBaseline: {
      // styleOverrides: `
      // @font-face { font-family: 'Inter'; font-style: normal; font-display: swap; font-weight: 400; src: local('Inter'), local('Inter-Regular'), url(${InterWoff2}) format('woff2'); unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF; }
      // `,
    },
    Link: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  }
});

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
                console.log(stockQoute.data)
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
          <ThemeProvider theme={theme}>
            <TransactionList data={mockData}/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      <Header/>
      <SearchBar
          getStockData={this.getStockData.bind(this)} />

          <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/accountInfo" element={<AccountInfo/>} />
          </Routes>
    </ThemeProvider>

        <StockCryptoPage
          liveData={this.state.liveData}
          stockObj={this.state.stockObj}
          errorMsg={this.state.errorMsg}
          handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
          barData={this.state.barData}
          qouteData={this.state.qouteData} />
        {/* <TransactionList data={mockData}/> */}
      <Portfolio />
        <LeaderBoard/>
      </>
    )
  }
}

export default App;