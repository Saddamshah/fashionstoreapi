const express = require('express');
const router = express.Router();
const { isSingIn } = require('../controllers/auth');
const { getToken, processPayment } = require('../controllers/paymentB');


router.get("/payment/gettoken/:userId", isSingIn, getToken)

router.post("/payment/braintree/:userId", isSingIn, processPayment)


module.exports = router;