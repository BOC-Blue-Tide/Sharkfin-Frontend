import React,  { useState, useEffect } from 'react';
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
import TransactionList from './transactions/TransactionList.jsx';
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
    h1: {
      fontSize: '4.25rem',
    },
    h2: {
      fontSize: '3.1rem',
      // fontWeight: '500'

    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: '500'

    },
    body1: {
      fontSize: '1.03rem',
      fontWeight: 500
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      fontStyle: 'bold',
      fontSize: "14px"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          padding: "9px 28px",
          borderWidth: "3px",
          borderRadius: "4px",
          borderColor: "#278D9B",
          "&:hover": {
            borderWidth: "3px",
            borderRadius: "4px",
            borderColor: "#278D9B",
          },
        },
        outlined: {
          padding: "7px 26px",
          borderWidth: "3px",
          borderRadius: "4px",
          borderColor: "#278D9B",
          "&:hover": {
            borderWidth: "3px",
            borderRadius: "4px",
            borderColor: "#278D9B",
          },
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
      orderObj: null,
      userInfo: {
        userId: 0,
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        bank: '',
        accountNumber: 0,
        profilePic: ''
      },
      userID: 1,
      transactionData: [],
      logged_email: ''
    }
    this.getTransactionData = this.getTransactionData.bind(this);
  }

  //Axios get request in componentdidmountto get this information
  async updateUserInfo() {
    var id = localStorage.getItem("id")
    var request = {
      headers: {
        "user_id": id
      }
    }

    //add axios get request using userid (stored in local storage) and set state for userInfo
    axios.get('/user', request);
    // const savedUser = JSON.parse(localStorage.getItem("user") || "null");

    let updatedUserInfo = {
      firstName: "Fred",
      lastName: "Flinstone",
      userName: "Dhalper",
      email: "Fred@test.org",
      bank: "CITI Bank",
      accountNumber: "1234",
      profilePic: "../../../dist/mockProfile.png"
   }
    this.setState({userInfo: updatedUserInfo})
    console.log(this.state.userInfo);

  }

  // componentDidMount() { // for development purpose only
  //   this.getStockData('msft', 'stock', 'search')
  //   this.getBarData('msft', this.state.start, this.state.timeframe)
  // }

  componentDidMount() {
    this.checkLoginState();
    this.updateUserInfo();
    this.getTransactionData();
  }

  handleOrderClick(orderObj) {
    this.setState({ orderObj: orderObj });
    axios({
      method: 'post',
      url: 'http://localhost:8080/transactions',
      data: orderObj,
    });
  }

  async getTransactionData() {
    try {
      const response = await axios.get('http://localhost:8080/transactions');
      this.setState({transactionData: response.data});
    } catch (err) {
      console.log(err);
    }
  }

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
  this.setState({ user: user });
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}

updateEmail = (user) => {
    this.setState(
      {logged_email: user}
    )
}

  checkLoginState = () => {
    axios.get('/status')
    .then((response) => {
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      this.setState({
        isReady: true,
        user: savedUser || response.data,
        logged_email: response.data
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

    if (!this.state.logged_email) {
      return (
        <Login updateEmail = {this.updateEmail} user = {this.state.logged_email}/>
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
            <Header getStockData={this.getStockData.bind(this)} updateEmail = {this.updateEmail} />

          {/* test only, will delete later */}
          {/* <div>username: {JSON.parse(localStorage.getItem("googleInfo")).username}</div>
          <div>firstname: {JSON.parse(localStorage.getItem("googleInfo")).firstname}</div>
          <div>lastname: {JSON.parse(localStorage.getItem("googleInfo")).lastname}</div>
          <div>email: {JSON.parse(localStorage.getItem("googleInfo")).email}</div>
          <div>
            image:
            <img src={JSON.parse(localStorage.getItem("googleInfo")).picture} />
          </div> */}

            <Routes>
              <Route exact path="/" element={<Portfolio userID={this.state.userID}/>} />
              <Route path="/accountInfo" element={<AccountInfo updateUserInfo={this.updateUserInfo} userInfo={this.state.userInfo}/>} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/transferForm" element={<TransferForm />} />
              <Route path="/transactionList" element={<TransactionList data={this.state.transactionData} />} />
              <Route path="/searchContent" element={<StockCryptoPage
                liveData={this.state.liveData}
                stockObj={this.state.stockObj}
                errorMsg={this.state.errorMsg}
                handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
                barData={this.state.barData}
                qouteData={this.state.qouteData}
                handleOrderClick={this.handleOrderClick.bind(this)} />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
        </>
      )
    }
  }
}

export default App;