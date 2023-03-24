
require("dotenv").config();
const router = require("express").Router();
const multer = require('multer');

const controllers = require('./controllers')
//leaderBoard
router.get('/friendBoard', controllers.leaderBoard.getFriendBoard)
router.get('/globalBoard', controllers.leaderBoard.getGlobalBoard)
// get market data
router.get('/order', controllers.orderData.postOrderData)
router.get('/status', (req, res) => {
  // console.log('in status');
  res.send(req.session.userid);
})
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get('/user', (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

router.post('/login', (req, res) => {
  console.log(req.body);
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
    res.redirect('/');
  })
})

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
  console.log(req.body)
  const userInfo = JSON.parse(req.body.userInfo);
  const profilePic = req.file;
  const imagePath = './uploads/' + profilePic.filename;
  userInfo.profilePic = imagePath;

  // Save the user information and image file to your storage service or database
  try {
    await updateUser(userInfo);
    res.send({ status: 'success' });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Error updating user data' });
  }
});


module.exports = router;