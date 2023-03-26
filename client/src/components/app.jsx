import React from 'react';
import StockPage from './stockCrypto/stockPage.jsx'
import CryptoPage from './stockCrypto/cryptoPage.jsx'
import helpers from './stockCrypto/helperFunctions/requestHelpers.js'
import Order from './stockCrypto/orderForm/orderTab.jsx'
import moment from 'moment-timezone'
const axios = require('axios').default;
const API_KEY = process.env.REACT_APP_ALPACA_KEY1;
const API_SECRET = process.env.REACT_APP_ALPACA_SECRET1;
const SOURCE = process.env.REACT_APP_ALPACA_SOURCE;
const POLYGON = process.env.REACT_APP_POLYGON;
const defaultStartTime = moment().subtract(1, 'days').toISOString()
//Jacinthe
import TransactionList from './transactions/TransactionList.jsx';
// import mockData from '../../../mockData.js';
import ChatPage from './chatApp/chatApp.jsx';
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
      orderObj: null, // user order input from requestReview.jsx
      coinMeta: null, // incoming data from api
      coinBarData: null, // incoming data from api
      coinLiveData: null, // incoming data from api
      searchScope: null,
      selectRange: '1d',
      coinToday: null,
      coinPrevious: null,
      orderObj: null,
      orderAcctNum: null,
      userInfo: {
        user_id: 0,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        bank: '',
        account_number: 0,
        profilepic_url: ''
      },
      transactionData: [],
      logged_email: ''
    }
    this.getTransactionData = this.getTransactionData.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    console.log('STATE:', this.state.userInfo);
  }



  // componentDidMount() { // for development purpose only
  //   this.getData('msft', 'stock', 'search')
  //   this.getBarData('msft', this.state.start, this.state.timeframe)
  // }

  componentDidMount() {
    this.checkLoginState();
    this.getUserInfo();
    this.getTransactionData();
  }

  async getUserInfo() {
    var id = JSON.parse(localStorage.googleInfo).id;
    const response = await axios.get(`http://localhost:8080/users/${id}`);
    console.log('RESPONSE:', response.data[0]);
    this.setState({ userInfo: response.data[0] })
  }

  async getAccountNumber(userid) {
    try {
      // send userid to backend
      var acctNum = await axios.get('http://localhost:8080/getAccountNumber', { params: { userid: userid } })
        .then(acctNum => {
          this.setState({ orderAcctNum: acctNum.data })
        })
    }
    catch (err) {
      console.log(err);
    }

  }
  getBuyPowerandHolding(symbol) {

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
      this.setState({ transactionData: response.data });
    } catch (err) {
      console.log(err);
    }
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

  async getData(input, selectedScope) {
    var symbol = input.toUpperCase()
    var scope = selectedScope.toLowerCase()
    try {
      this.setState({ currentSymbol: symbol, searchScope: selectedScope }, async () => {
        if (scope === 'stock') {
          var symbolData = await axios.get('/symbolLookup', { params: { symbol: symbol } })
            .then(async (symbolData) => {
              this.setState({ stockObj: symbolData.data })
            })
            .then(async () => {
              var stockQoute = await axios.get('/getStockQoute', { params: { symbol: symbol } })
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
        else if (scope === 'crypto') {

          let coinMeta = await axios.get('/getCoinMeta', { params: { symbol: symbol } })
            .then(async (coinMetaData) => {
              var coinMetaArr = coinMetaData.data
              this.setState({ coinMeta: coinMetaArr[symbol] })
            })
            .then(async () => {
              await this.getCoinBarData(symbol)
            })
            .then(async () => {
              let coinToday = await axios.get('/getCoinToday', { params: { symbol: symbol } })
              //console.log(coinToday.data)
              this.setState({ coinToday: coinToday.data })
            })
            .then(async () => {
              let coinPrevious = await axios.get('/getCoinPrevious', { params: { symbol: symbol } })
              console.log(coinPrevious.data.results)
              this.setState({ coinPrevious: coinPrevious.data.results })
            })
        }
      })
    } catch (err) {
      console.log(err)
      this.setState({ errorMsg: 'Something went wrong.' })
    }
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
          var coinBar = await axios.get('/getCoinBar', requestOptions)
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
          var barData = await axios.get('/getBarData', requestOptions)
          this.setState({ barData: barData.data })
        })

    }
    catch (err) {
      console.log(err)
      this.setState({ errorMsg: 'Something went wrong.' })
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
      { logged_email: user }
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
        // console.log('/status', response);
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
        <Login updateEmail={this.updateEmail} user={this.state.logged_email} getUser={this.getUserInfo}/>
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
            <Header getData={this.getData.bind(this)} updateEmail={this.updateEmail} />

            {/* test only, will delete later */}
            {/* <div>user_id: {JSON.parse(localStorage.getItem("googleInfo")).id}</div>
          <div>username: {JSON.parse(localStorage.getItem("googleInfo")).username}</div>
          <div>firstname: {JSON.parse(localStorage.getItem("googleInfo")).firstname}</div>
          <div>lastname: {JSON.parse(localStorage.getItem("googleInfo")).lastname}</div>
          <div>email: {JSON.parse(localStorage.getItem("googleInfo")).email}</div>
          <div>
            image:
            <img src={JSON.parse(localStorage.getItem("googleInfo")).picture} />
          </div> */}

          {/* <AddFriends />
          <ViewRequests /> */}

            <Routes>
              <Route exact path="/" element={<Portfolio user={this.state.userInfo} accountNum={this.state.userInfo.accountNumber}/>} />
              <Route path="/accountInfo" element={<AccountInfo userInfo={this.state.userInfo}/>} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/transferForm" element={<TransferForm />} />
              <Route path="/transactionList" element={<TransactionList data={this.state.transactionData} />} />
              <Route path="/stockContent" element={
                <>
                  {this.state.stockObj && this.state.barData && this.state.qouteData ?
                    <div className="page-content">
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <StockPage
                            liveData={this.state.liveData}
                            stockObj={this.state.stockObj}
                            errorMsg={this.state.errorMsg}
                            handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
                            barData={this.state.barData}
                            qouteData={this.state.qouteData}
                            symbol={this.state.currentSymbol}
                            handleOrderClick={this.handleOrderClick.bind(this)} />
                        </Grid>
                        <Grid item xs={4}>
                          <Order pageType={'stock'}
                            handleOrderClick={this.handleOrderClick.bind(this)}
                            stockObj={this.state.stockObj}
                            barData={this.state.barData} />
                        </Grid>
                      </Grid>
                    </div> : null}
                </>
              } />
              <Route path="/cryptoContent" element={
                <>
                  {this.state.coinMeta && this.state.coinBarData ?
                    <div className="page-content">
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <CryptoPage
                            coinMeta={this.state.coinMeta}
                            coinBarData={this.state.coinBarData}
                            coinLiveData={this.state.coinLiveData}
                            coinToday={this.state.coinToday}
                            coinPrevious={this.state.coinPrevious}
                            errorMsg={this.state.errorMsg}
                            handleTimeRangeClick={this.handleTimeRangeClick.bind(this)}
                            handleOrderClick={this.handleOrderClick.bind(this)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Order pageType={'crypto'}
                            handleOrderClick={this.handleOrderClick.bind(this)}
                            coinMeta={this.state.coinMeta}
                            coinBarData={this.state.coinBarData}
                            coinToday={this.state.coinToday}
                            coinPrevious={this.state.coinPrevious} />
                        </Grid>
                      </Grid>
                    </div>
                    : null}
                </>
              } />
              <Route path="/chat" element={<ChatPage />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider >
        </>
      )
    }
  }
}

export default App;