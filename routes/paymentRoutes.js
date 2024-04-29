const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to handle payment
router.post('/checkout', paymentController.processPayment);

module.exports = router;
