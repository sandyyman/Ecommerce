const Product = require("../models/product");
const User = require("../models/user");
const appErr = require("../utils/appErr");

// GET /products: Get a list of all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /products/{id}: Get details of a specific product
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /products/create: Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, quantity } = req.body;
  try {
    console.log(req.file);
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !req.file
    ) {
      return res.json(appErr("All fields are needed to be added."));
    }
    // console.log(req.file);
    const userId = req.session.userAuth;
    // console.log(userId);
    const newProduct = await Product.create({
      name,
      description,
      user: userId,
      price,
      category,
      quantity,
      images: req.file.path,
    });
    res.json({ data: newProduct });
  } catch (error) {
    res.json(appErr(error.message, 500));
  }
};

// PUT /products/{id}/update: Update product details
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category, quantity } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        category,
        quantity,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res(appErr("Cant find the product.."), 403);
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /products/{id}/delete: Delete a product
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
