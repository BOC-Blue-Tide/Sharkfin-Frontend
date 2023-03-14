require("dotenv").config();
const router = require("express").Router();
const controllers = require('./controllers')

// get market data
router.get('/order', controllers.orderData.postOrderData)



module.exports = router;