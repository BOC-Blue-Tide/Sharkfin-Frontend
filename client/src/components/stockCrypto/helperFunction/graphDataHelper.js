const helpers = {
  processGraphData: async (barData) => {
    var graphData = {}
    var xAxis = []
    var yAxis = []
    for (let i = 0; i < barData.length; i++) {
      let time = new Date(barData[i].t).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(/AM|PM/, '')
      xAxis.push(time)
      yAxis.push(barData[i].c)
    }

    graphData['xAxis'] = xAxis
    graphData['yAxis'] = yAxis
    return graphData
  }


}

export default helpers