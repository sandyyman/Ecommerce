const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/product");
const protected = require("../middlewares/protected");
const storage = require("../config/cloudinary");

const upload = multer({ storage });

// GET /products: Get a list of all products
router.get("", productController.getAllProducts);

// GET /products/{id}: Get details of a specific product
router.get("/:id", productController.getProductById);

// POST /products/create: Create a new product
router.post(
  "/create",
  protected,
  upload.single("file"),
  productController.createProduct
);

// PUT /products/{id}/update: Update product details
router.put(
  "/:id/update",
  protected,
  upload.single("file"),
  productController.updateProduct
);

// DELETE /products/{id}/delete: Delete a product
router.delete("/:id/delete", protected, productController.deleteProduct);

module.exports = router;
