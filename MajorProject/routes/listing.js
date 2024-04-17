

const express = require("express"); // Importing the express module to create an Express router.
const router = express.Router(); // Creating a router instance.
const wrapAsync = require("../utils/wrapAsync.js"); // Importing a utility function for handling asynchronous operations.
const ExpressError = require("../utils/ExpressError.js"); // Importing a custom error class.
const { listingSchema } = require("../schema.js"); // Importing the schema for listing validation.
const Listing = require("../models/listing.js"); // Importing the Listing model.
const { isLoggedIn, validateListing, isOwner } = require("../views/middlewares.js");



const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });




  
const listingController= require("../controllers/listings.js");


// root route
router.get("/home",(listingController.landingPage));


// part 2 --- listing route (index route)
router.get ("/",wrapAsync(listingController.index));
    
    
    
    
    
    
    // part 4 --- new and create route ---// we have wriiten the part 4 code above the par 3 so that the server dont get confused if /new is a id or not 
    
 // new route 
router.get("/new",  isLoggedIn,listingController.renderNewForm);
    



 // create route 
router.post("/",upload.single('listing[image]'),validateListing, isLoggedIn,wrapAsync(listingController.createListing));
    




// part 3 --- show route 
router.get("/:id",wrapAsync(listingController.showListing));

  





// part 5 ---  update routes ie Edit and Update route

// Edit route ---
   // this route is to edit and update the listing 
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.editListing));
  
  
  
// update route 
router.put("/:id",upload.single('listing[image]'),validateListing, isLoggedIn, isOwner,wrapAsync(listingController.updateListing));
  
 



  
// part 6 --- delete route 
router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));
  


  module.exports=router;