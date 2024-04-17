const express = require("express"); // Importing the express module to create an Express router.
const router = express.Router({ mergeParams: true }); // Creating a router instance with merging params to access parent route parameters.
const wrapAsync = require("../utils/wrapAsync.js"); // Importing a utility function for handling asynchronous operations.
const ExpressError = require("../utils/ExpressError.js"); // Importing a custom error class.
const { reviewSchema } = require("../schema.js"); // Importing the schema for review validation.
const Listing = require("../models/listing.js"); // Importing the Listing model.
const Reviews = require("../models/reviews.js"); // Importing the Reviews model.
const { validateReview, isLoggedIn, isReviewAuthor } = require("../views/middlewares.js");



const reviewControllers=require("../controllers/reviews.js");















// Post Reviews route
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewControllers.createReviews));










// Delete Review route
router.delete("/:reviewsId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.deleteReviews));

module.exports = router; // Exporting the router for use in other parts of the application.
