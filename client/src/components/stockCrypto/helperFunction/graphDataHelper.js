const helpers = {
  processGraphData: async (barData) => {
    var graphData = []
    for (let i = 0; i < barData.length; i++) {
      //console.log(barData[0].t)
      let date = new Date(barData[i].t)
      graphData.push({ 'x': date, 'y': barData[i].c })
    }
    return graphData
  }


}

export default helpers