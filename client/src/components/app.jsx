import React from 'react';
const axios = require('axios').default;
// import SearchBar from './searchBar.jsx'
import StockCryptoPage from './stockCrypto/stockCryptoPage.jsx'
import helpers from './helperFunctions/requestHelpers.js'
import moment from 'moment-timezone'
const API_KEY = process.env.REACT_APP_ALPACA_KEY1;
const API_SECRET = process.env.REACT_APP_ALPACA_SECRET1;
const SOURCE = process.env.REACT_APP_ALPACA_SOURCE;
const POLYGON = process.env.REACT_APP_POLYGON;
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
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Route, Routes, Navigate } from 'react-router-dom';
import AccountInfo from './accountInfo/accountInfo.jsx';
import TransferForm from './accountInfo/transferForm.jsx'
import Header from './header.jsx'

//Mengna
import Login from './Login/Login.jsx';
import AddFriends from './Friends/AddFriends.jsx';
import ViewRequests from './Friends/ViewRequests.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: "#278D9B",
    },
    secondary: {
      main: '#11cb5f',
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
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',// can be dynaimc if offers currency selection
      stockObj: null, // incoming data from api
      liveData: null, // incoming data from api
      barData: null, // incoming data from api
      qouteData: null, // incoming data from api
      errorMsg: null,
      currentSymbol: null,
      start: defaultStartTime,
      timeframe: '5Min',
      isReady: false,
      user: ""
    }
  }

  // componentDidMount() { // for development purpose only
  //   this.getStockData('msft', 'stock', 'search')
  //   this.getBarData('msft', this.state.start, this.state.timeframe)
  // }

  handleTimeRangeClick(start, timeframe) {
    this.setState({ start: start, timeframe: timeframe }, async () => {
      this.getBarData(this.state.currentSymbol, this.state.start, this.state.timeframe) // replace 'msft' to this.state.currentSymbol
    })
  }

  async getStockData(input, scope, operation) {

    var symbol = input.toUpperCase()
    if (operation === 'search') {
      if (scope === 'stock') {
        try {
          this.setState({ currentSymbol: symbol }, async () => {
            var symbolData = await helpers.symbolLookup(symbol)
              .then(async (symbolData) => {

                //console.log(symbolData.data)
                this.setState({ stockObj: symbolData.data })
                this.getLiveData(symbol)
              })
              .then(async () => {
                var stockQoute = await helpers.getStockQoute(symbol)
                //console.log(stockQoute.data)
                this.setState({ qouteData: stockQoute.data['Global Quote'] })
              })
              .then(async () => {
                await this.getBarData(symbol, this.state.start, this.state.timeframe)
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
    const socket = new WebSocket('wss://ws.finnhub.io?token=cga100pr01qqlesgbg5gcga100pr01qqlesgbg60');

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
        this.setState({ liveData: data })
      }

    };

    // Unsubscribe
    var unsubscribe = function (symbol) {
      socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
    }
  }

  updateUser = (user) => {
    this.setState(
      { user: user }
    )
  }

  checkLoginState = () => {
    axios.get('/status')
      .then((response) => {
        this.setState({
          isReady: true,
          user: response.data,
        })
        console.log('/status', response);
      })
      .catch((err) => {
        console.log('logout error', err);
      })
  }

  render() {
    if (!this.state.isReady) {
      <div></div>
    }

    if (!this.state.user) {
      return (
        <Login updateUser={this.updateUser} user={this.state.user} />
      )
    } else {
      return (
        <>
          <ThemeProvider theme={theme}>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <Header getStockData={this.getStockData.bind(this)} updateUser={this.updateUser} />
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/accountInfo" element={<AccountInfo />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/transferForm" element={<TransferForm />} />
              <Route path="/transactionList" element={<TransactionList data={mockData} />} />
              <Route path="/searchContent" element={<StockCryptoPage
                liveData={this.state.liveData}
                stockObj={this.state.stockObj}
                errorMsg={this.state.errorMsg}
                handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
                barData={this.state.barData}
                qouteData={this.state.qouteData} />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
        </>
      )
    }
  }
}

export default App;

