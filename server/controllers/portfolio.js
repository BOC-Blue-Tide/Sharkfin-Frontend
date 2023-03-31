require('dotenv').config();
const axios = require('axios');
const backurl = process.env.BACKEND_URL;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

module.exports = {
  getPChart : async (req, res) => {
    var user_id = req.query.user_id;
    var timeWindow = req.query.timeSelect;
    var paramsC = {
      'user_id' : user_id,
      'timeWindow' : timeWindow
    };
    await axios.get(`http://${SERVER_URL}/pchart`, {params: paramsC})
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  getPAllocationAndPosition : async (req, res) => {
    var user_id = req.query.user_id;
    var paramsAP = {
      'user_id' : user_id
    };
    await axios.get(`http://${SERVER_URL}/pallocation`, {params: paramsAP})
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}