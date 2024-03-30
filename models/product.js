const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Fashion",
        "Electronics",
        "Home Appliances",
        "Handicrafts",
        "Stationary",
        "Books",
        "other",
      ],
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: [String],

    // Define any other fields as needed
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
