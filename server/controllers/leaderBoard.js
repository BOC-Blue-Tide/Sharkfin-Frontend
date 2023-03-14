const Axios = require('axios');
// require("dotenv").config();


module.exports = {

  getFriendBoard: (req, res) => {
    //console.log('review req', req.body)
    var dummyData = [{name: "Lenord", gain: "23"},{name: "Howard", gain: "22"}, {name: "Jason", gain: "18"}, {name: "Daniel", gain: "16"}]
    res.send(dummyData)
  },

  getGlobalBoard: (req, res) => {
    //console.log('metadata req', req.body)
    var dummyData = [{name: "Jush", gain: "30"},{name: "Lenord", gain: "23"},{name: "Howard", gain: "22"}, {name: "Jason", gain: "-6"}, {name: "Daniel", gain: "-18"}]
    res.send(dummyData)
  }
}