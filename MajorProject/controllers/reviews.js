

const Reviews = require("../models/reviews.js"); // Importing the Reviews model.
const Listing = require("../models/listing.js"); // Importing the Listing model.

// to create new reviews
module.exports.createReviews=(async (req, res) => {
    let listing = await Listing.findById(req.params.id); // Retrieve the listing based on the provided ID from the request parameters.
    let newReview = new Reviews(req.body.review); // Create a new review object using the data from the request body.
    newReview.author=req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview); // Add the newly created review to the "reviews" array of the retrieved listing.
    await newReview.save(); // Save the new review to the database.
    await listing.save(); // Save the updated listing (with the new review) to the database.
    console.log("new review saved"); // Log a message indicating that the new review has been successfully saved.
    req.flash("success", "Review Saved !");
    res.redirect(`/listings/${listing._id}`); // Redirect the user to the page displaying the details of the updated listing.
  });









// to delete the reviews

  module.exports.deleteReviews=(async (req, res) => {
    let { id, reviewsId } = req.params; // Extract the listing ID and review ID from the request parameters.
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } }); // Remove the specified review ID from the "reviews" array of the listing with the given ID.
    await Reviews.findByIdAndDelete(reviewsId); // Delete the review with the specified ID from the database.
    res.redirect(`/listings/${id}`); // Redirect the user to the page displaying the details of the listing from which the review was deleted.
    console.log("review deleted"); // Log a message indicating that the review has been successfully deleted.
    req.flash("success", "Review Deleted !");
  })