const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/', orderController.createOrder);

// // Route to get all orders
// router.get('/', orderController.getOrders);

// Route to get a specific order by ID
router.get('/:id', orderController.getOrder);


module.exports = router;
