import Axios from 'axios'
const avToken = process.env.REACT_APP_ALPHA_VANTAGE
const alphavantage = 'https://www.alphavantage.co/query?function='
const cmToken = process.env.REACT_APP_COINMARKET_KEY


const helpers = {
  checkDate: async (date) => {
    var day = new Date(date).getDay()
    var newDate = new Date(date)
    if (day == 0) {
      newDate.setDate(newDate.getDate() - 3);
      //console.log(newDate)
      return newDate.toISOString();
    } else if (day === 6) {
      newDate.setDate(newDate.getDate() - 2);
      //console.log(newDate)
      return newDate.toISOString();
    } else {
      return date;
    }
  },
  getTimeRange: async (selectRange) => {
    var map = {
      '1d': ['5', 'minute'],
      '1w': ['10', 'minute'],
      '1m': ['1', 'hour'],
      '3m': ['1', 'hour'],
      '1y': ['1', 'day'],
      '5y': ['1', 'week']
    }
    let formattedDate = await helpers.formatDate(selectRange)
    var result = {
      multiplier: map[selectRange][0],
      timespan: map[selectRange][1],
      fromDate: formattedDate.fromDate,
      toDate: formattedDate.toDate
    }
    return result


  },
  formatDate: async (selectRange) => {

    const currentDate = new Date()
    let fromDate = null;

    switch (selectRange) {
      case "1d":
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
        break;
      case "1w":
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        break;
      case "1m":
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        break;
      case "3m":
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
        break;
      case "1y":
        fromDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
        break;
      case "5y":
        fromDate = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());
        break;
      default:
        console.error("Invalid input!");
        return null;
    }

    return {
      fromDate: fromDate.toISOString().slice(0, 10),
      toDate: currentDate.toISOString().slice(0, 10)
    };
  }

}


export default helpers;

