import Axios from 'axios'
const avToken = process.env.REACT_APP_ALPHA_VANTAGE
const alphavantage = 'https://www.alphavantage.co/query?function='


const helpers = {
  symbolLookup: async (symbol) => {
    var url = `${alphavantage}OVERVIEW&symbol=${symbol}&apikey=${avToken}`
    let symbolData = await Axios.get(url)
    return symbolData
  },
  getBarData: async (symbol, start, timeframe) => {

    var limit = 1000
    var url = `https://data.alpaca.markets/v2/stocks/${symbol}/bars?start=${start}&timeframe=${timeframe}&limit=${limit}`
    var requestOption = {
      headers: {
        "Apca-Api-Key-Id": process.env.REACT_APP_ALPACA_ID,
        "Apca-Api-Secret-Key": process.env.REACT_APP_ALPACA_KEY
      }
    }
    let stock = await Axios.get(url, requestOption)
    return stock.data.bars
  },
  getStockQoute: async (symbol) => {
    var url = `${alphavantage}GLOBAL_QUOTE&symbol=${symbol}&apikey=${avToken}`
    let stockQouteData = await Axios(url)
    return stockQouteData
  }

}


export default helpers;


// getStockWebSocket: (symbol) => {
//   //console.log(symbol)
//   let preventClose = false
//   return new Promise((resolve, reject) => {
//     const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB}`);

//     socket.onopen = (event) => {
//       socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }))
//     };

//     socket.onmessage = (event) => {
//       preventClose = true
//       console.log('Message from server ', event.data);
//       // unsubscribe(symbol)
//       // socket.close()
//       resolve(event.data)
//     }

//     socket.onerror = (event) => {
//       unsubscribe(symbol)
//       socket.close()
//       return reject(event.data)
//     }

//     // Unsubscribe function
//     var unsubscribe = function (symbol) {
//       socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
//     }

//     // timer to prevent long hanging
//     // currently set to 250ms
//     setTimeout(function () {
//       if (!preventClose) {
//         console.log('times up')
//         unsubscribe(symbol)
//         socket.close()
//         return resolve(false)
//       }
//       console.log('no times out')
//     }, 2000);

//   })


// }