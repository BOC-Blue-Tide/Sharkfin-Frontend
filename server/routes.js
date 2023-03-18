
require("dotenv").config();
const router = require("express").Router();
const controllers = require('./controllers')
//leaderBoard
router.get('/friendBoard', controllers.leaderBoard.getFriendBoard)
router.get('/globalBoard', controllers.leaderBoard.getGlobalBoard)
// get market data
router.get('/order', controllers.orderData.postOrderData)
router.post('/test1', (req, res) => {
  // console.log(req.body, 'ahha');

  //res.send('');
  res.redirect('/');
})





module.exports = router;