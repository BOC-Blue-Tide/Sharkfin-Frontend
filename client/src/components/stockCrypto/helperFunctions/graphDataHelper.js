const helpers = {
  processGraphData: async (barData) => {
    var graphData = []
    for (let i = 0; i < barData.length; i++) {
      //console.log(barData[0].t)
      let date = new Date(barData[i].t)
      graphData.push({ 'x': date, 'y': barData[i].c })
    }
    return graphData
  },
  addNewDataToGraph: async (graphDataArr, liveData) => {
    let date = new Date(liveData[0].t)
    graphDataArr.push({ 'x': date, 'y': liveData[0].p })
    return graphDataArr
  }


}

export default helpers