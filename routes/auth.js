const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSingIn } = require("../controllers/auth")

router.post('/signup', [
    check('name').isLength({ min: 3 }).withMessage("Username Should  be atleast 3 chars."),
    check('email').isEmail().withMessage("valide email Id is require."),
    check('password').isLength({ min: 3 }).withMessage("Password Should be atleast 3 chars.")
], signup);

router.post('/signin', [
    check('email').isEmail().withMessage("valide email Id is require."),
    check('password').isLength({ min: 3 }).withMessage("Password is require.")
], signin)

router.get('/signout', signout);

router.get('/test', isSingIn, (req, res) => {
    res.json(req.auth)
})

module.exports = router;