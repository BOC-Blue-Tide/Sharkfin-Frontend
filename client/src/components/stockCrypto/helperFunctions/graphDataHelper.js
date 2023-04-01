const helpers = {
  processGraphData: async (barData) => {
    var graphData = []
    for (let i = 0; i < barData.length; i++) {
      //console.log(barData[0].t)
      // filter out weeekend date here?
      let date = new Date(barData[i].t)
      graphData.push({ 'x': date, 'y': barData[i].c })
    }
    return graphData
  },
  addNewDataToGraph: async (graphDataArr, liveData) => {
    // filter out weeekend date here?
    let date = new Date(liveData[0].t)
    graphDataArr.push({ 'x': date, 'y': liveData[0].p })
    return graphDataArr
  },
  addNewCryptoDataToGraph: async (graphDataArr, liveData) => {
    // filter out weeekend date here?
    let date = new Date(liveData[0].t)
    graphDataArr.push({ 'x': date, 'y': liveData[0].c })
    return graphDataArr
  }



}

export default helpers