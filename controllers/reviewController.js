const Review = require("../models/reviews");
const User = require("../models/user");
const Product = require("../models/product");
const appErr = require("../utils/appErr");

// GET /reviews/{id}: Get details of a specific review
const getReviewById = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.json(appErr("Review not found", 404));
    }
    res.json(review);
  } catch (error) {
    res.json(appErr(error.message, 500));
  }
};

// POST /reviews/create: Create a new review
const createReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  try {
    const userId = req.session.userAuth;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!product) {
      return res.json(appErr("Product isnt awailable", 400));
    }

    const newReview = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });
    product.reviews.push(newReview._id);
    await product.save({ validateBeforeSave: false });

    res.json({ data: newReview });
  } catch (error) {
    return res.json(appErr(error.message, 404));
  }
};

// PUT /reviews/{id}/update: Update review details
const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        rating,
        comment,
      },
      { new: true }
    );
    if (!updatedReview) {
      return res.json(appErr("Review not found", 404));
    }
    res.json(updatedReview);
  } catch (error) {
    return res.json(appErr(error.message, 404));
  }
};

// DELETE /reviews/{id}/delete: Delete a review
const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.json(appErr("Review not found", 404));
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.json(appErr(error.message, 500));
  }
};

// GET /reviews: Get a list of all reviews
// exports.getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     res.json(reviews);
//   } catch (error) {
//     return res.json(appErr(error.message, 404));
//   }
// };

module.exports = {
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
