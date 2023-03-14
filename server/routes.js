// require("dotenv").config();
const router = require("express").Router();
const controller = require('./controllers/')


//leaderBoard
router.get('/friendBoard', controller.leaderBoard.getFriendBoard)
router.get('/globalBoard', controller.leaderBoard.getGlobalBoard)



module.exports = router;