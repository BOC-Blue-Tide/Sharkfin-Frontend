
require("dotenv").config();
const router = require("express").Router();
const controllers = require('./controllers')
//leaderBoard
router.get('/friendBoard', controllers.leaderBoard.getFriendBoard)
router.get('/globalBoard', controllers.leaderBoard.getGlobalBoard)
// get market data
router.get('/order', controllers.orderData.postOrderData)




module.exports = router;