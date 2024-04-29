const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referencing the User model
        required: true // Ensuring the user field is required
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Referencing the Product model
        required: true // Ensuring at least one product is required in the array
    }],
    total_amount: {
        type: Number,
        default: 0 // Default value for total_amount is 0
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
