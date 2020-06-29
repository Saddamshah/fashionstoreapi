const express = require('express');
const router = express.Router();

const { isSingIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUSerById, pushOrderInPurchaseList } = require('../controllers/user');

const { updateStock } = require('../controllers/product')
const { getOrderId, createOrder, getAllOrders, updateStatus, getOrderStatus } = require('../controllers/order')


//params
router.param('userId', getUSerById)
router.param('orderId', getOrderId)

//actual routes
//create
router.post(
    '/order/create/:userId',
    isSingIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
)

//read 
router.get('/order/all/:userId', isSingIn, isAuthenticated, isAdmin, getAllOrders);

//update 
router.get('/order/status/:userId', isSingIn, isAuthenticated, isAdmin, getOrderStatus)
router.put('/order/:orderId/status/:userId', isSingIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router;