const express = require("express");
const router = express.Router();

const { getUSerById, getUser, updateUser, userPurchaseList } = require("../controllers/user")
const { isSingIn, isAuthenticated, isAdmin } = require("../controllers/auth")

router.param('userId', getUSerById);

router.get("/user/:userId", isSingIn, isAuthenticated, getUser);
router.put("/user/:userId", isSingIn, isAuthenticated, updateUser);
router.get("/order/user/:userId", isSingIn, isAuthenticated, userPurchaseList);



module.exports = router;