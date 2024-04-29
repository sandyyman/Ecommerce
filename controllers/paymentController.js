const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment');
const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');

exports.processPayment = async (req, res) => {
    const {  tokenId } = req.body;

    try {
        const userId = req.session.userAuth;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        // Use the pre-calculated total amount from the cart
        let totalAmount = cart.total_amount;

        const charge = await stripe.charges.create({
            amount: totalAmount,
            currency: 'inr',
            source: tokenId,
            description: `Charge for ${user.email}`
        });

        // Create a payment record
        const payment = new Payment({
            user: userId,
            cart: cart._id,
            amount: totalAmount,
            status: 'completed',  // Assuming the charge was successful
            transactionId: charge.id
        });
        await payment.save();

        // Link payment to the order using order ID
        const order = await Order.findOne({ cart: cart._id });
        if (!order) {
            return res.status(404).send('Order not found');
        }
        order.payment = payment._id;
        await order.save();

        // Optionally update cart status or clean up cart after successful payment
        // cart.product = [];
        // cart.total_amount = 0;
        // await cart.save();

        res.send({ success: true, paymentId: payment._id, charge });
    } catch (error) {
        console.error("Payment error: ", error);
        res.status(500).send({ error: error.message });
    }
};
