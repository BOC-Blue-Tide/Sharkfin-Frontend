
require("dotenv").config();
const router = require("express").Router();
const multer = require('multer');

const controllers = require('./controllers')
const axios = require('axios').default;
const jwt_decode = require("jwt-decode");

//leaderBoard
router.get('/friendBoard', controllers.leaderBoard.getFriendBoard)
router.get('/globalBoard', controllers.leaderBoard.getGlobalBoard)
// get market data
router.get('/order', controllers.orderData.postOrderData)
router.get('/status', (req, res) => {
  // console.log('in status');
  res.send(req.session.userid);
})

router.get('/finances', (req, res) => {
  console.log(req.body);
  res.send('finance updated');
})
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

// router.get('/getUserInfo', (req, res) => {
//   // console.log('/TESTING GET USER INFO', req.headers.id)
//   axios.get('http://localhost:8080/getUserInfo', {
//     params: { id: req.headers.id }
//   })
//   .then((data) => {
//     console.log(data.data)
//     res.json(data.data);
//   })
//   .catch((err) => {
//     console.log('getuserinfo err')
//     res.sendStatus(500);
//   });
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/updateUserInfo', upload.single('profilePic'), async (req, res) => {
  console.log('UPDATEE', req.body.userInfo);
  if (req.body.userInfo) {
    const userInfo = JSON.parse(req.body.userInfo);
  }
  // const profilePic = req.file;
  // const imagePath = './uploads/' + profilePic;
  // userInfo.profilePic = imagePath;
  // axios
  // // Save the user information and image file to your storage service or database
    axios.post('http://localhost:8080/updateUserInfo', {data: userInfo})
    .then((response1) => {
      console.log('updateUserInfo', response1.data.rows[0].id)
      //res.send(response1.data.rows[0].id);
      let data = response1.data.rows[0].id;
      if (data) {
        res.json(data);
      } else {
        res.status(500).send({ status: 'error', message: 'Error updating user data' })
      }
    })
    .catch((err) =>  res.status(500).send({ status: 'error', message: 'Error updating user data' }))
  

    // await updateUser(userInfo);
  // } catch (error) {
  //   res.status(500).send({ status: 'error', message: 'Error updating user data' });
  // }
});


router.post('/login', (req, res) => {
  // console.log(req.body);
  controllers.login.verify(req.body.credential)
  .then((resp)=>{
    // console.log('verify success', resp);
  })
  .catch((err)=> {
    // console.log('verify failed', err);
  })
  .then(()=>{
    session=req.session;
    session.userid=req.body.email;
    console.log(req.session);
    res.json(0);
    // res.redirect('/');
  })
  // .then(() => {
  //   axios.get('http://localhost:8080/getUserByEmail', {params: {email: req.body.email}})
  //   .then((response) => {
  //     var userInfo = response.data.rows;
  //     console.log('getUserByEmail response', userInfo);
  //     if (userInfo.length) {
  //       res.json(userInfo[0].id);
  //     } else {
  //       var decoded = jwt_decode(req.body.credential);
  //       var newUser = {
  //         "username": decoded.name,
  //         "firstname": decoded.given_name,
  //         "lastname": decoded.family_name,
  //         "email": decoded.email,
  //         "picture": decoded.picture
  //       }
  //       axios.post('http://localhost:8080/addUser', {data: newUser})
  //       .then((response1) => {
  //         console.log('login, addUser resp', response1.data.rows[0].id)
  //         //res.send(response1.data.rows[0].id);
  //         let data = response1.data.rows[0].id;
  //         res.json(data);
  //       })
  //       .catch((err) => console.log('post new user error', err))
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('getUserByEmail error', err);
  //   });
  // })
})

router.get('/pchart', controllers.portfolio.getPChart)
router.get('/pallopos', controllers.portfolio.getPAllocationAndPosition)

//IMAGE UPLOAD:




module.exports = router;