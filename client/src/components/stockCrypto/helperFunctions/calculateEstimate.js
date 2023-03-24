const helpers = {
  calculateEstimate: async (orderIn, OrderType, amount, price) => {

    console.log(orderIn, OrderType, amount, price)
    // 0 = buy
    //1 = sell
    var estimate;

    if (orderIn === 'dollars') {
      estimate = Number(amount) / price
    } else if (orderIn === 'shares') {
      estimate = Number(amount) * price
    }
    return estimate

  }

}

export default helpers
