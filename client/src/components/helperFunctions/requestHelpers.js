import Axios from 'axios'
const polygonToken = process.env.REACT_APP_POLYGON

const helpers = {
  symbolLookup: async (symbol) => {
    var url = `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=`
    let symbolData = await Axios.get(`${url}${polygonToken}`)
    return symbolData
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