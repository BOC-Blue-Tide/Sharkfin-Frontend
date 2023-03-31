import helperFun from './calculateEstimate.js'

const helpers = {
  calculateOrder: async (amount, orderIn, availBalance, holding, buySell, purchasePrice) => {
    // console.log(amount, orderIn, availBalance, holding, buySell)
    var result = false
    let estimate = await helperFun.calculateEstimate(orderIn, amount, purchasePrice)
    //console.log('estimate', estimate)
    //buy
    if (buySell === 0) {
      if (orderIn === 'shares' || orderIn === 'coins') {
        if (availBalance >= estimate) {
          result = true
        }
      } else {
        if (availBalance >= amount) {
          result = true
        }
      }

    }
    else { // sell
      if (amount <= holding) {
        result = true
      }
    }

    return result
  }
}

export default helpers
