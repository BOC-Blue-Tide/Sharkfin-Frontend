require('dotenv').config();
const axios = require('axios');
const backurl = process.env.BACKEND_URL;

module.exports = {
  getPChart : async (req, res) => {
    var user_id_C = req.query.userID;
    var timeWindow_C = req.query.timeSelect;
    var paramsC = {
      'user_id' : user_id_C,
      'timeWindow' : timeWindow_C
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
    var user_id = req.query.user_id;
    var paramsC = {
      'user_id' : user_id
    };
    await axios.get(`http://localhost:4000/pallocation`, {params: paramsC})
      .then((result) => {
        res.status(200).send(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}