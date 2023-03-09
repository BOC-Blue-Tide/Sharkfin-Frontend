const helpers = {
  getStockWebSocket: (symbol) => {
    //console.log(symbol)
    let preventClose = false
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUB}`);

      socket.onopen = (event) => {
        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }))
      };

      socket.onmessage = (event) => {
        preventClose = true
        console.log('Message from server ', event.data);
        unsubscribe(symbol)
        socket.close()
        return resolve(event.data)
      }

      socket.onerror = (event) => {
        unsubscribe(symbol)
        socket.close()
        return reject(event.data)
      }

      // Unsubscribe function
      var unsubscribe = function (symbol) {
        socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
      }

      // timer to prevent long hanging
      setTimeout(function () {
        console.log('times up')
        if (!preventClose) {
          unsubscribe(symbol)
          socket.close()
          return resolve(false)
        }

      }, 250);

    })


  }
}


export default helpers;