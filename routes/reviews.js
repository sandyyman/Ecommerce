const express = require("express");
const router = express.Router();
const protected = require("../middlewares/protected");

const {
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// GET /reviews: Get a list of all reviews
// router.get("/reviews", getAllReviews);

// GET /reviews/{id}: Get details of a specific review
router.get("/:id", getReviewById);

// POST /reviews/create: Create a new review
router.post("/create", protected, createReview);

// PUT /reviews/{id}/update: Update review details
router.put("/:id/update", protected, updateReview);

// DELETE /reviews/{id}/delete: Delete a review
router.delete("/:id/delete", protected, deleteReview);

module.exports = router;
