import React from 'react';
import Axios from 'axios'
const axios = require('axios').default;
import StockPage from './stockCrypto/stockPage.jsx'
import CryptoPage from './stockCrypto/cryptoPage.jsx'
import helpers from './stockCrypto/helperFunctions/requestHelpers.js'
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
      user: "",
      orderObj: null, // user order input from requestReview.jsx
      coinMeta: null, // incoming data from api
      coinBarData: null, // incoming data from api
      coinLiveData: null, // incoming data from api
      searchScope: null,
      selectRange: '1d'
    }
  }

  // componentDidMount() { // for development purpose only
  //   this.getStockData('msft', 'stock', 'search')
  //   this.getBarData('msft', this.state.start, this.state.timeframe)
  // }

  componentDidMount() {
    this.checkLoginState();
  }

  handleOrderClick(orderObj) {
    this.setState({ orderObj: orderObj })
  }

  handleTimeRangeClick(start, timeframe, selectRange) {
    if (this.state.searchScope === 'Stock') {
      this.setState({ start: start, timeframe: timeframe, selectRange: selectRange }, async () => {
        this.getBarData(this.state.currentSymbol, this.state.start, this.state.timeframe) // replace 'msft' to this.state.currentSymbol
      })
    } else if (this.state.searchScope === 'Crypto') {
      this.setState({ selectRange: selectRange }, async () => {
        this.getCoinBarData(this.state.currentSymbol)
      })

    }

  }

  async getStockData(input, selectedScope) {
    var symbol = input.toUpperCase()
    var scope = selectedScope.toLowerCase()
    this.setState({ currentSymbol: symbol, searchScope: selectedScope }, async () => {
      if (scope === 'stock') {
        try {
          var symbolData = await Axios.get('/symbolLookup', { params: { symbol: symbol } })
            .then(async (symbolData) => {
              this.setState({ stockObj: symbolData.data }, () => {
                if (Object.keys(this.state.stockObj).length > 0) {
                  this.getLiveData(symbol)
                }
              })
            })
            .then(async () => {
              var stockQoute = await Axios.get('/getStockQoute', { params: { symbol: symbol } })
              // console.log(stockQoute)
              if (!stockQoute.data.Note) {
                this.setState({ qouteData: stockQoute.data['Global Quote'] })
              } else {
                this.setState({ errorMsg: 'Standard API call frequency is 5 calls per minute and 500 calls per day. Please try again later' })
              }

            })
            .then(async () => {
              await this.getBarData(symbol, this.state.start, this.state.timeframe)

            })
        }
        catch (err) {
          console.log(err)
          this.setState({ errorMsg: 'Something went wrong.' })
        }
      } else if (scope === 'crypto') {
        // let input = 'BTC'
        let coinMeta = await Axios.get('/getCoinMeta', { params: { symbol: symbol } })
          .then(async (coinMetaData) => {
            var coinMetaArr = coinMetaData.data
            this.setState({ coinMeta: coinMetaArr[symbol] })
          })
          .then(async () => {
            await this.getCoinBarData(symbol)
          })
      }
    })
  }

  async getCoinBarData(symbol) {
    try {
      var requestOptions = {
        params: {
          symbol: symbol,
          timespan: null,
          multiplier: null,
          fromDate: null,
          toDate: null
        }
      }
      var timeRange = await helpers.getTimeRange(this.state.selectRange)
        .then((timeRange) => {
          requestOptions.params.timespan = timeRange.timespan
          requestOptions.params.multiplier = timeRange.multiplier
          requestOptions.params.fromDate = timeRange.fromDate
          requestOptions.params.toDate = timeRange.toDate
        })
        .then(async () => {
          var coinBar = await Axios.get('/getCoinBar', requestOptions)
          this.setState({ coinBarData: coinBar.data.results })
        })


    }
    catch (err) {
      console.log(err)
      this.setState({ errorMsg: 'Something went wrong.' })
    }

  }


  async getBarData(symbol, start, timeframe) {
    try {
      // make sure start day is a business day
      var checkDate = await helpers.checkDate(start)
        .then(async (startDate) => {
          var requestOptions = {
            params: {
              symbol: symbol,
              startDate: startDate,
              timeframe: timeframe
            }
          }
          var barData = await Axios.get('/getBarData', requestOptions)
          this.setState({ barData: barData.data })
        })

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
    this.setState({ user: user });
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  checkLoginState = () => {
    axios.get('/status')
      .then((response) => {
        const savedUser = JSON.parse(localStorage.getItem("user") || "null");
        this.setState({
          isReady: true,
          user: savedUser || response.data,
        });
        console.log('/status', response);
      })
      .catch((err) => {
        console.log('logout error', err);
      });
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
              <Route exact path="/" element={<Portfolio />} />
              <Route path="/accountInfo" element={<AccountInfo />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/transferForm" element={<TransferForm />} />
              <Route path="/transactionList" element={<TransactionList data={mockData} />} />
              <Route path="/stockContent" element={<StockPage
                liveData={this.state.liveData}
                stockObj={this.state.stockObj}
                errorMsg={this.state.errorMsg}
                handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
                barData={this.state.barData}
                qouteData={this.state.qouteData}
                handleOrderClick={this.handleOrderClick.bind(this)} />} />
              <Route path="/cryptoContent" element={<CryptoPage
                coinMeta={this.state.coinMeta}
                coinBarData={this.state.coinBarData}
                coinLiveData={this.state.coinLiveData}
                errorMsg={this.state.errorMsg}
                handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
                handleOrderClick={this.handleOrderClick.bind(this)}
              />
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider >
        </>
      )
    }
  }
}

export default App;

