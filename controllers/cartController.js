// const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

// Create Cart Item
exports.createCartItem = async (req, res) => {
    try {
        const { products } = req.body;
        // const userId = req.user._id; // Assuming user is authenticated and req.user contains user information
        // const userId = req.user ? req.user._id : null;
        const userId = req.session.userAuth;

        // Check if the product exists
        // const product = await Product.findById(productId);
        // if (!product) {
        //     return res.status(404).json({
        //         status: 'fail',
        //         message: 'Product not found'
        //     });
        // }
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide valid products array'
            });
        }

        const productIds = products.map(product => product.productId);

        // Check if all products exist
        const existingProducts = await Product.find({ _id: { $in: productIds } });
        if (existingProducts.length !== products.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'One or more products not found'
            });
        }

        const totalAmount = calculateTotalAmount(products, existingProducts);

        // Create the cart item
        const newCartItem = await Cart.create({
            user: userId,
            products: products.map(product => ({
                product: existingProducts.find(p => p._id.equals(product.productId)),
                quantity: product.quantity
            })),
            total_amount: totalAmount
        });

        res.status(201).json({
            status: 'success',
            data: {
                cartItem: newCartItem
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

function calculateTotalAmount(products, existingProducts) {
    let totalAmount = 0;
    for (const product of products) {
        const existingProduct = existingProducts.find(p => p._id.equals(product.productId));
        if (existingProduct) {
            totalAmount += existingProduct.price * product.quantity;
        }
    }
    return totalAmount;
};

// Get Cart Items
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.session.userAuth;
        if (!userId) {
            return res.status(401).json({
                status: 'fail',
                message: 'User not authenticated'
            });
        }

        // Assuming user is authenticated and req.user contains user information

        // Fetch cart items for the current user and populate the product details
        const cartItems = await Cart.find({ user: userId });
        console.log("User ID:", userId);
        console.log("Cart Items:", cartItems);
        res.status(200).json({
            status: 'success',
            data: {
                cartItems
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while fetching cart items'
        });
    }
};

// Update Cart Item
exports.updateCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.cartItemId;
        const updateData = req.body;

        // Update the cart item
        const updatedCartItem = await Cart.findByIdAndUpdate(cartItemId, updateData, { new: true });

        res.status(200).json({
            status: 'success',
            data: {
                cartItem: updatedCartItem
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'An error occurred while updating the cart item'
        });
    }
};

// Remove Cart Item
exports.removeCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.cartItemId;
        const cartItem = await Cart.findById(cartItemId);
        console.log("Cart Item:", cartItem);
        // Remove the item from cart
        await Cart.findByIdAndRemove(cartItemId);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while removing the cart item'
        });
    }
};

// Clear Cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.session.userAuth; // Assuming user is authenticated 

        // Clear all cart items for the user
        const result = await Cart.deleteMany({ user: userId });
        console.log("Clear Cart Result:", result);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'An error occurred while clearing the cart'
        });
    }
};
