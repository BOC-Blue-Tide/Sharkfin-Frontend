var GainAndLoss = function(symbol, date, portfolio, history) {
  var myTotalCost = 0;
  var targetPortfolio = portfolio[0];
  myTotalCost = targetPortfolio.avgCost * targetPortfolio.qty;
  var targetHistory = history[symbol];
  var output = {};
  output.date = date;
  output.timestamp = [];
  output.gainlossArr = [];
  for (var i = 0; i < targetHistory.length; i++) {
    var currTimestamp = date + ' ' + targetHistory[i].time;
    var currGainloss = myTotalCost - targetHistory[i].price * targetPortfolio.qty;
    output.timestamp.push(currTimestamp);
    output.gainlossArr.push(currGainloss);
  }
  return output;
};

var allocationRatio = function(portfolio) {
  var output = {};
  output.symbols = [];
  output.ratios = [];
  var totalNetWorth = 0;
  for (var i = 0; i < portfolio.length; i++) {
    totalNetWorth += portfolio[i].avgCost * portfolio[i].qty;
  }
  for (var j = 0; j < portfolio.length; j++) {
    output.symbols.push(portfolio[j].symbol);
    var currTotal = portfolio[j].avgCost * portfolio[j].qty;
    var currPer = currTotal/totalNetWorth * 100;
    output.ratios.push(currPer);
  }
  return output;
};

module.exports = {GainAndLoss, allocationRatio};