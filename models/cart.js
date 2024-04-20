const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    }],
    total_amount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
