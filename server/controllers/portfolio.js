require('dotenv').config();
const axios = require('axios');
const backurl = process.env.BACKEND_URL;

module.exports = {
  getPChart : async (req, res) => {
    var accountNum = req.query.accountNum;
    var timeWindow = req.query.timeSelect;
    var paramsC = {
      'accountNum' : accountNum,
      'timeWindow' : timeWindow
    };
    await axios.get(`http://localhost:4000/pchart`, {params: paramsC})
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  getPAllocationAndPosition : async (req, res) => {
    var accountNum = req.query.accountNum;
    var paramsAP = {
      'accountNum' : accountNum
    };
    await axios.get(`http://localhost:4000/pallocation`, {params: paramsAP})
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}