require("dotenv").config();
const router = require("express").Router();
const multer = require('multer');
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const controllers = require('./controllers')
const axios = require('axios').default;
const jwt_decode = require("jwt-decode");

//leaderBoard
router.get('/friendBoard', controllers.leaderBoard.getFriendBoard)
router.get('/globalBoard', controllers.leaderBoard.getGlobalBoard)
router.get('/getuserdetail', controllers.leaderBoard.getuserdetail)

// get market data
router.get('/symbolLookup', controllers.getAPIData.symbolLookup)
router.get('/getBarData', controllers.getAPIData.getBarData)
router.get('/getStockQoute', controllers.getAPIData.getStockQoute)
router.get('/getCoinMeta', controllers.getAPIData.getCoinMeta)
router.get('/getCoinBar', controllers.getAPIData.getCoinBar)
router.get('/getCoinToday', controllers.getAPIData.getCoinToday)
router.get('/getCoinPrevious', controllers.getAPIData.getCoinPrevious)

router.get('/status', (req, res) => {
  // console.log('in status');
  res.send(req.session.userid);
})
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.post('/login', (req, res) => {
  // console.log(req.body);
  //google login success
  controllers.login.verify(req.body.credential)
  .then((resp)=>{
    console.log('verify success', resp);
  })
  .catch((err)=> {
    console.log('verify failed', err);
  })
  .then(()=>{
    session=req.session;
    session.userid=req.body.email;
    console.log(req.session);
    // res.json(0);
  })
  .then(() => {
    axios.get(`http://${SERVER_URL}/getUserByEmail`, {params: {email: req.body.email}})
    .then((response) => {
      var userInfo = response.data.rows;
      console.log('getUserByEmail response', userInfo);
      if (userInfo.length) {
        res.json({id: userInfo[0].id, newUser: false});
      } else {
        var decoded = jwt_decode(req.body.credential);
        var newUser = {
          "username": decoded.name,
          "firstname": decoded.given_name,
          "lastname": decoded.family_name,
          "email": decoded.email,
          "picture": decoded.picture
        }
        axios.post(`http://${SERVER_URL}/addUser`, {data: newUser})
        .then((response1) => {
          console.log('login, addUser resp', response1.data.rows[0].id)
          let data = response1.data.rows[0].id;
          res.json({id: data, newUser: true});
        })
        .catch((err) => {
          console.log('post new user error', err);
          res.json({id: 0, newUser: false});
        })
      }
    })
    .catch((err) => {
      console.log('getUserByEmail error', err);
      res.json({id: 0, newUser: false});
    });
  })
})

router.get('/pchart', controllers.portfolio.getPChart)
router.get('/pallopos', controllers.portfolio.getPAllocationAndPosition)

//IMAGE UPLOAD:

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post('/api/updateUserInfo', upload.single('profilePic'), async (req, res) => {
//   const userInfo = JSON.parse(req.body.userInfo);
//   const profilePic = req.file;
//   const imagePath = './uploads/' + profilePic.filename;
//   userInfo.profilePic = imagePath;

//   // Save the user information and image file to your storage service or database
//   await saveUserData(userInfo);

//   res.send({ status: 'success' });
// });






module.exports = router;