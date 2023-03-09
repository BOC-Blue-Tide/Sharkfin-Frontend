import React from 'react';
import Axios from 'axios'
import SearchBar from './searchBar.jsx'
import helpers from './helperFunctions/webSocketHelper.js'
const token = process.env.REACT_APP_FINNHUB

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',// can be dynaimc if offers currency selection
      liveData: {}
    }
  }
  async getStockData(input, operation) {
    if (operation === 'search') {
      try {

        var webSocketData = await helpers.getStockWebSocket(input)
          .then(async (webSocketData) => {
            if (!webSocketData) {
              var url = `https://finnhub.io/api/v1/quote?symbol=${input}&token=`
              let symbol = await Axios.get(`${url}${token}`)
              console.log(symbol)
              this.setState({ liveData: symbol.data })
            } else {
              this.setState({ liveData: webSocketData })
            }
          })
      }
      catch (err) {
        console.log(err)
      }
    }

  }



  render() {
    return (
      <>
        <SearchBar getStockData={this.getStockData.bind(this)} />
      </>
    )
  }
}

export default App;