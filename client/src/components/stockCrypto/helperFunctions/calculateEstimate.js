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
    console.log(estimate)
    return estimate

  }

}

export default helpers
