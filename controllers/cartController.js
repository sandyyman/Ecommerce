// const User = require('../models/user');
const Product = require("../models/product");
const Cart = require("../models/cart");

// Create Cart Item
const createCartItem = async (req, res) => {
  try {
    const { productId, totalAmount } = req.body;
    const userId = req.session.userAuth; // Assuming user is authenticated and req.user contains user information

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    // Create the cart item
    const newCartItem = await Cart.create({
      user_id: userId,
      product_id: productId,
      total_amount: totalAmount,
    });

    res.status(201).json({
      status: "success",
      data: {
        cartItem: newCartItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get Cart Items
const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and req.user contains user information

    // Fetch cart items for the current user and populate the product details
    const cartItems = await Cart.find({ user: userId }).populate("product");

    res.status(200).json({
      status: "success",
      data: {
        cartItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while fetching cart items",
    });
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;
    const updateData = req.body;

    // Update the cart item
    const updatedCartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        cartItem: updatedCartItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "An error occurred while updating the cart item",
    });
  }
};

// Remove Cart Item
const removeCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;

    // Remove the item from cart
    await Cart.findByIdAndRemove(cartItemId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while removing the cart item",
    });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated

    // Clear all cart items for the user
    await Cart.deleteMany({ user: userId });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while clearing the cart",
    });
  }
};

module.exports = {
  createCartItem,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
};
