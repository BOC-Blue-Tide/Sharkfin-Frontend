const Axios = require('axios');
const avToken = process.env.REACT_APP_ALPHA_VANTAGE
const alphavantage = 'https://www.alphavantage.co/query?function='
const cmToken = process.env.REACT_APP_COINMARKET_KEY

module.exports = {
  symbolLookup: async (req, res) => {
    console.log(req.query.symbol)
    let symbol = req.query.symbol
    var url = `${alphavantage}OVERVIEW&symbol=${symbol}&apikey=${avToken}`
    let symbolData = await Axios.get(url)
    //console.log(symbolData.data)
    res.send(symbolData.data)

  },
  getStockQoute: async (req, res) => {
    let symbol = req.query.symbol
    var url = `${alphavantage}GLOBAL_QUOTE&symbol=${symbol}&apikey=${avToken}`
    let stockQouteData = await Axios(url)
    res.send(stockQouteData.data)
  },
  getBarData: async (req, res) => {
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

  },
  getCoinMeta: async (req, res) => {
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
  },
  getCoinBar: (req, res) => {

  }
}