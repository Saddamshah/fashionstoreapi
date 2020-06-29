const express = require('express')
const router = express.Router();

const { getCategoryById, createCrategory, getCategory, getAllCategories, updateCategory, romoveCategory } = require("../controllers/category")
const { isSingIn, isAdmin, isAuthenticated } = require("../controllers/auth")
const { getUSerById } = require("../controllers/user")

//params
router.param('userId', getUSerById);
router.param('categoryId', getCategoryById);

//Create
router.post('/category/create/:userId',
    isSingIn, isAuthenticated, isAdmin, createCrategory);

//read
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);

//update
router.put('/category/:categoryId/:userId',
    isSingIn, isAuthenticated, isAdmin, updateCategory);

//delete
router.delete('/category/:categoryId/:userId',
    isSingIn, isAuthenticated, isAdmin, romoveCategory)


module.exports = router;