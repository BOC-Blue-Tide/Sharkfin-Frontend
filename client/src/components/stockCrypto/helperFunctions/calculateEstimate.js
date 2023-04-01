const helpers = {
  calculateEstimate: async (orderIn, amount, price) => {

    //console.log(orderIn, amount, price)
    // 0 = buy
    //1 = sell
    var estimate;

    if (orderIn === 'dollars') {
      estimate = Number(amount) / price
    } else if (orderIn === 'shares') {
      estimate = Number(amount) * price
    }
    else if (orderIn === 'coins') {
      estimate = Number(amount) * price
    }
    //console.log(estimate)
    return estimate

  },
  calculateRemaining: async (orderIn, amountInput, availBalance, estimate, orderType, holding) => {
    //console.log(orderIn, amountInput, availBalance, estimate, orderType, holding)
    var remaining = {};
    var amount = parseFloat(amountInput)
    //buy
    if (orderType === 'buy') {
      if (orderIn === 'shares' || orderIn === 'coins') {
        remaining.buyPower = availBalance - estimate
        remaining.holding = holding + amount
      } else {
        remaining.buyPower = availBalance - amount
        remaining.holding = holding + estimate
      }

    }
    else { // sell
      if (orderIn === 'shares' || orderIn === 'coins') {
        remaining.buyPower = availBalance + estimate
        remaining.holding = holding - amount
      } else {
        remaining.buyPower = availBalance + amount
        remaining.holding = holding + estimate
      }
    }
    return remaining
  }

}

export default helpers
