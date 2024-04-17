const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js"); // Importing a custom error class.
const { listingSchema } = require("../schema.js"); // Importing the schema for listing validation.
const { reviewSchema } = require("../schema.js"); // Importing the schema for review validation.
const reviews = require("../models/reviews.js");


module.exports.isLoggedIn = (req,res,next)=>{



if(!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing !");
    return res.redirect("/login");
  }
next();
};



module.exports.saveRedirectUrl=(req,res,next)=>{

    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner= async (req,res,next)=>{

    let {id}=req.params; // extracting id 
    let listing=await Listing.findById(id);
    if(! listing.owner._id.equals(res.locals.currentUser._id)){
      req.flash("error","you are not the Owner of this Listing !")
     return res.redirect(`/listings/${id}`);
    }
  
next();
}






module.exports.validateListing = (req, res, next) => { // Middleware function for validating form data using Joi
  let { error } = listingSchema.validate(req.body); // Validate the form data against the listing schema.
  if (error) { // If there is an error in validation:
    let errorMessage = error.details.map((el) => el.message).join(","); // Create an error message from the validation error details.
    throw new ExpressError(400, errorMessage); // Throw a custom ExpressError with a status code 400 and the error message.
  } else {
    next(); // If validation passes, proceed to the next middleware or route handler.
  }
};



// Middleware function for validating review data using Joi
 module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body); // Validate the review data against the review schema.
    if (error) { // If there is an error in validation:
      let errorMessage = error.details.map((el) => el.message).join(","); // Create an error message from the validation error details.
      throw new ExpressError(400, errorMessage); // Throw a custom ExpressError with a status code 400 and the error message.
    } else {
      next(); // If validation passes, proceed to the next middleware or route handler.
    }
  };
  

  module.exports.isReviewAuthor= async (req,res,next)=>{

    let {id,reviewsId }=req.params; // extracting id 
    let review=await reviews.findById(reviewsId);
    if(! review.author.equals(res.locals.currentUser._id)){
      req.flash("error","you are not the author of this review !");
     return res.redirect(`/listings/${id}`);
     
    }
  
  next();
  };