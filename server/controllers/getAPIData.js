const Axios = require('axios');
const avToken = process.env.REACT_APP_ALPHA_VANTAGE
const alphavantage = 'https://www.alphavantage.co/query?function='
const cmToken = process.env.REACT_APP_COINMARKET_KEY
const polygon = process.env.REACT_APP_POLYGON

module.exports = {
  symbolLookup: async (req, res) => {
    try {
      // console.log(req.query.symbol)
      let symbol = req.query.symbol
      var url = `${alphavantage}OVERVIEW&symbol=${symbol}&apikey=${avToken}`
      let symbolData = await Axios.get(url)
      //console.log(symbolData.data)
      res.send(symbolData.data)
    }
    catch (err) {
      res.status(500)
    }

  },
  getStockQoute: async (req, res) => {
    try {
      let symbol = req.query.symbol
      var url = `${alphavantage}GLOBAL_QUOTE&symbol=${symbol}&apikey=${avToken}`
      let stockQouteData = await Axios(url)
      res.send(stockQouteData.data)
    }
    catch (err) {
      res.status(500)
    }

  },
  getBarData: async (req, res) => {
    try {
      var limit = 1000
      var symbol = req.query.symbol
      var start = req.query.startDate
      var timeframe = req.query.timeframe
      var url = `https://data.alpaca.markets/v2/stocks/${symbol}/bars?start=${start}&timeframe=${timeframe}&limit=${limit}`

      var requestOption = {
        headers: {
          "Apca-Api-Key-Id": process.env.REACT_APP_ALPACA_ID,
          "Apca-Api-Secret-Key": process.env.REACT_APP_ALPACA_KEY
        }
      }
      let stock = await Axios.get(url, requestOption)
      //console.log(stock.data)
      res.send(stock.data.bars)
    }
    catch (err) {
      res.status(500)
    }


  },
  getCoinMeta: async (req, res) => {
    try {
      var symbol = req.query.symbol
      var url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`
      var requestOption = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-CMC_PRO_API_KEY": cmToken
        }
      }

      let coinMeta = await Axios.get(url, requestOption)
      //console.log(coinMeta.data.data)
      res.send(coinMeta.data.data)
    }
    catch (err) {
      res.status(500)
    }

  },
  getCoinBar: async (req, res) => {
    try {
      var limit = 1000
      var symbol = req.query.symbol
      var multiplier = req.query.multiplier
      var timespan = req.query.timespan
      var fromDate = req.query.fromDate
      var toDate = req.query.toDate
      var url = `https://api.polygon.io/v2/aggs/ticker/X:${symbol}USD/range/${multiplier}/${timespan}/${fromDate}/${toDate}?adjusted=true&sort=asc&limit=${limit}&apiKey=${polygon}`

      let coinBar = await Axios.get(url)
      res.send(coinBar.data)
    }
    catch (err) {
      res.status(500)
    }
  },
  getCoinToday: async (req, res) => {

    try {
      var todayDate = new Date().toISOString().slice(0, 10)
      var symbol = req.query.symbol
      var url = `https://api.polygon.io/v1/open-close/crypto/${symbol}/USD/${todayDate}?adjusted=true&apiKey=${polygon}`
      let coinToday = await Axios.get(url)
      res.send(coinToday.data)
    }
    catch (err) {
      res.status(500)
    }
  },
  getCoinPrevious: async (req, res) => {
    try {
      var symbol = req.query.symbol
      var url = `https://api.polygon.io/v2/aggs/ticker/X:${symbol}USD/prev?adjusted=true&apiKey=${polygon}`
      let coinPrevious = await Axios.get(url)
      res.send(coinPrevious.data)
    }
    catch (err) {
      res.status(500)
    }
  }
}