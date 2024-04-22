const Order = require('../models/order');

// Function to generate a unique order ID
function generateOrderId() {
    const timestamp = new Date().getTime().toString(36); // Convert current timestamp to base36 string
    const randomChars = Math.random().toString(36); // Generate random string
    return timestamp + randomChars; // Concatenate timestamp and random string
}

exports.createOrder = async (req, res) => {
    const { userId, cartId, totalAmount } = req.body;

    try {
        // Create the order
        const order = new Order({
            user: userId,
            order_id: generateOrderId(), // Generate unique order ID
            cart: cartId,
            total_amount: totalAmount,
            status: "pending"
        });
        const savedOrder = await order.save();

        res.status(201).json(savedOrder); // Return the newly created order
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




