require('dotenv').config();
const axios = require('axios');
const backurl = process.env.BACKEND_URL;

module.exports = {
  getPChart : async (req, res) => {
    var user_id = req.query.user_id;
    var timeWindow = req.query.timeSelect;
    var paramsC = {
      'user_id' : user_id,
      'timeWindow' : timeWindow
    };
    await axios.get(`http://localhost:8080/pchart`, {params: paramsC})
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
    await axios.get(`http://localhost:8080/pallocation`, {params: paramsAP})
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}