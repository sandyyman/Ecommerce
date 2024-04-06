const express = require("express");
const router = express.Router();
const protected = require("../middlewares/protected");
const { createCartItem, updateCartItem, removeCartItem, clearCart, getCartItems } = require('../controllers/cartController');


router.post('/createItem', createCartItem);

router.put('/updateItem/:cartItemId', protected, updateCartItem);

router.delete('/removeItem/:cartItemId', protected, removeCartItem);

router.delete('/clearCart', protected, clearCart);

router.get('/cartItems', protected, getCartItems);

module.exports = router;