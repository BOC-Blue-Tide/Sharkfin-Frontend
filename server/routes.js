
require("dotenv").config();
const router = require("express").Router();
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
router.post('/login', (req, res) => {
  console.log(req.body);
  controllers.login.verify(req.body.credential)
  .then((resp)=>{
    // console.log('verify success', resp);
  })
  .catch((err)=> {
    console.log('verify failed', err);
  })
  .then(()=>{
    session=req.session;
    session.userid=req.body.email;
    res.redirect('/');
  })
})

router.get('/pchart', controllers.portfolio.getPChart)
router.get('/pallopos', controllers.portfolio.getPAllocationAndPosition)





module.exports = router;