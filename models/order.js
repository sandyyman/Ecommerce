const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order_id: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart", // Reference to the Cart model
        required: true
    },
    total_amount: {
        type: Number,
        required: true,
    },
    order_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
