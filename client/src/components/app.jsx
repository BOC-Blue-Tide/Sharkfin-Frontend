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
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
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
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';


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
        fab: {
          background: '#278D9B'
          }
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
      assetData: { availBalance: 0 },
      availFunds: {
        avail_balance: 0,
        net_deposits: 0
      },
      chatPopperOpen: false,
      chatPopperAnchorEl: null,
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
  }


  componentDidMount() {
    this.checkLoginState();
    this.getUserInfo();
    this.getTransactionData();

    //   this.getData('msft', 'stock', 'search') // for development purpose only
    //   this.getBarData('msft', this.state.start, this.state.timeframe) // for development purpose only
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.userInfo) && (this.state.userInfo) && (prevState.userInfo.email !== this.state.userInfo.email)) {
      (async () => {
        await this.getAvailBalance(this.state.userInfo.user_id)
      })()
    }
  }

  handleChatButtonClick = (event) => {
    this.setState({
      chatPopperOpen: !this.state.chatPopperOpen,
      chatPopperAnchorEl: event.currentTarget,
    });
  };

  handleCloseChat = () => {
    this.setState({
      chatPopperOpen: false,
      chatPopperAnchorEl: null,
    });
  };

  //  customizedPaper = styled(Paper)(({ theme }) => ({
  //   padding: theme.spacing(2),
  //   backgroundColor: theme.palette.primary.main,
  //   color: theme.palette.primary.contrastText,
  // }));

  // chatButton = () => (
  // )


  async getUserInfo() {
    if (!localStorage.googleInfo) {
      return;
    }
    var id = JSON.parse(localStorage.getItem(['googleInfo'])).id;
    const response = await axios.get(`http://${SERVER_URL}/users/${id}`);
    // const response = await axios.get(`http://${SERVER_URL}/users/1`);
    console.log('GET USER INFO CALLED:', response.data[0]);
    this.setState({ userInfo: response.data[0] })
  }

  async getAvailBalance(userid) {
    try {
      // send userid to backend
      let assetData = this.state.assetData
      var availBalance = await axios.get(`http://${SERVER_URL}/finances/${userid}/balance`)
        .then(availBalance => {
          if (availBalance.data.length === 0) {
            this.setState({ availFunds: {
              avail_balance: 0,
              net_deposits: 0
            }});
          } else {
            this.setState({ availFunds: availBalance.data[0] })
            if (assetData) {
              assetData.availBalance = availBalance.data[0].avail_balance
              this.setState({ assetData: assetData })
            }
          }
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  updateBalance(newBalance) {
    this.setState({ availFunds: newBalance });
  }

  async getHoldingAmount(symbolInput) {
    try {
      let assetData = this.state.assetData
      let userid = this.state.userInfo.user_id
      let symbol = symbolInput.toUpperCase()
      var holding = await axios.get(`http://${SERVER_URL}/getHoldingAmount`, { params: { userid: userid, symbol: symbol } })
        .then(holding => {
          if (assetData) {
            if (holding.data.length === 0) {
              assetData.holding = 0
              this.setState({ assetData: assetData })
            } else {
              assetData.holding = holding.data[0].qty
              this.setState({ assetData: assetData })
            }

            //console.log(assetData)
          }
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  handleOrderClick(orderObj) {
    console.log('data to DB', orderObj)
    this.setState({ orderObj: orderObj });
    var postTransaction = axios({
      method: 'post',
      url: `http://${SERVER_URL}/transactions`,
      data: orderObj,
    });

    var updatePortfolioInstant = axios({
      method: 'put',
      url: `http://${SERVER_URL}/updatePortfolioinstant`,
      data: orderObj,
    });

    Promise.all([postTransaction, updatePortfolioInstant])
      .then(() => {
        // Both requests have completed successfully
        this.getAvailBalance(this.state.userInfo.user_id)
        this.getHoldingAmount(this.state.currentSymbol)
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  async getTransactionData() {
    try {
      var id = JSON.parse(localStorage.googleInfo).id;
      const response = await axios.get(`http://${SERVER_URL}/transactions/${id}`);
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
    var symbol = input.toUpperCase();
    //console.log(symbol);
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
    if ((!this.state.logged_email) || (!this.state.userInfo) || (this.state.userInfo.user_id === 0)) {
      return (
        <Login updateEmail={this.updateEmail} user={this.state.logged_email} getUser={this.getUserInfo} />
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
            <Header getData={this.getData.bind(this)} updateEmail={this.updateEmail} getHoldingAmount={this.getHoldingAmount.bind(this)} />
            <>
              <Fab
                color="secondary"
                aria-label="chat"
                onClick={this.handleChatButtonClick}
                style={{
                  position: 'fixed',
                  bottom: '16px',
                  right: '16px',
                  background: theme.palette.primary.main,
                  color: "white"
                }}
              >
                <ChatIcon />
              </Fab>
              <Popper
                open={this.state.chatPopperOpen}
                anchorEl={this.state.chatPopperAnchorEl}
                placement="top-end"
                onClose={this.handleCloseChat}
                style={{
                  zIndex: 1500,
                  marginBottom: '20px'
                }}
              >
                <Paper sx={{height: "520px", width: "320px", borderRadius: "10px"}}>
                  <ChatPage/>
                </Paper>
              </Popper>
            </>            {/* test only, will delete later */}
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
              <Route exact path="/" element={<Portfolio user={this.state.userInfo} assetData={this.state.assetData} availFunds={this.state.availFunds}/>} />
              <Route path="/accountInfo" element={<AccountInfo userInfo={this.state.userInfo} availFunds={this.state.availFunds} getUserInfo={this.getUserInfo} />} />
              <Route path="/leaderboard" element={<LeaderBoard user={this.state.userInfo} assetData={this.state.assetData}/>} />
              <Route path="/transferForm" element={<TransferForm
                userInfo={this.state.userInfo}
                availFunds={this.state.availFunds}
                getUserInfo={this.getUserInfo}
                getAvailBalance={this.getAvailBalance.bind(this)}
                updateBalance={this.updateBalance.bind(this)}
              />} />
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
                            handleOrderClick={this.handleOrderClick.bind(this)}

                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Order pageType={'stock'}
                            handleOrderClick={this.handleOrderClick.bind(this)}
                            stockObj={this.state.stockObj}
                            barData={this.state.barData}
                            assetData={this.state.assetData}
                            userid={this.state.userInfo.user_id} />
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
                            coinPrevious={this.state.coinPrevious}
                            assetData={this.state.assetData}
                            userid={this.state.userInfo.user_id}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    : null}
                </>
              } />
              <Route path="/chat" element={<ChatPage userInfo={this.state.userInfo}/>} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider >
        </>
      )
    }
  }
}

export default App;