const express = require('express');
const router = express.Router();
const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories
} = require('../controllers/product');
const { isSingIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUSerById } = require('../controllers/user');


//all params
router.param('userId', getUSerById)
router.param('productId', getProductById)


//all actual routers
//create products
router.post('/product/create/:userId', isSingIn, isAuthenticated, isAdmin, createProduct)

//read products
router.get('/product/:productId', getProduct)
router.get('/product/photo/:productId', photo)

//update products
router.put('/product/:productId/:userId', isSingIn, isAuthenticated, isAdmin, updateProduct)

//delete products
router.delete('/product/:productId/:userId', isSingIn, isAuthenticated, isAdmin, deleteProduct)

//listing all product
router.get('/products', getAllProducts)
router.get('/products/categories', getAllUniqueCategories)

module.exports = router;