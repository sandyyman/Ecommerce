const Cart = require('../models/cart');
const Product = require('../models/product'); // Assuming you have a Product model

const addItem = async (req, res) => {
    const {  productId } = req.body; // Assuming userId and productId are sent in the request body
console.log("started baby");
    try {
        const userId = req.session.userAuth
        let cart = await Cart.findOne({ user: req.session.userAuth });
console.log("Cart1 = ",cart);
        if (!cart) {
            // If no cart exists for this user, create a new cart
            cart = new Cart({
                user: userId,
                product: [productId],
                total_amount: 0 // Initialize total_amount to 0
            });
            console.log("Cart wasnt there...");
        } else {
            // If cart already exists, add the new product to the array
            cart.product.push(productId);
        }

        // Fetch the price of the product being added
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the total_amount based on whether the cart was empty or not
        if (cart.product.length === 1) {
            // This is the first product being added to the cart
            cart.total_amount = product.price;
        } else {
            // Add the price of the new product to the existing total_amount
            cart.total_amount += product.price;
        }

        await cart.save();
        
        res.status(201).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error('Failed to add item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart', error });
    }
};


const deleteItem = async (req, res) => {
    const { productId } = req.body;
    const userId = req.session.userAuth; 

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the index of the product in the cart's product array
        const productIndex = cart.product.findIndex(prodId => prodId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Fetch the price of the product being removed
        const productToRemove = await Product.findById(productId);

        if (!productToRemove) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productPrice = productToRemove.price;

        // Remove the product from the cart's product array
        cart.product.splice(productIndex, 1);

        // Deduct the price of the removed product from the total_amount
        cart.total_amount -= productPrice;

        await cart.save();
        
        res.json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
        console.error('Failed to remove item from cart:', error);
        res.status(500).json({ message: 'Failed to remove item from cart', error });
    }
};




const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get cart', error });
    }
};

module.exports = {addItem,deleteItem, getCart };
