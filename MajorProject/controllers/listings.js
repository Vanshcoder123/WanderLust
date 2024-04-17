const Listing = require("../models/listing.js"); // Importing the Listing model.
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});





// move to root route

module.exports.landingPage = (req,res)=> { // root route to check server 
    res.render("landing.ejs");
    
};


// Route to render the index page displaying all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}); // Retrieve all listings from the database
    res.render("listings/index.ejs", { allListings }); // Render the index page with the retrieved listings
};










// Route to render the form for creating a new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs"); // Render the form for creating a new listing
};











// Route to show details about an individual listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params; // Extract the listing ID from the request parameters
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } }) // Populate reviews and author fields
        .populate("owner"); // Populate owner field
    if (!listing) {
        req.flash("error", "Listing Does not exist !");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing }); // Render the show page with the retrieved listing
};








// Route to create a new listing
module.exports.createListing = async (req, res, next) => {



   let responce= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();
        





    let url= req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing); // Create a new listing object from the request body
    newListing.owner = req.user._id; // Set the owner of the listing
    newListing.image={url,filename};
    
    newListing.geometry=responce.body.features[0].geometry;

    let savedListing = await newListing.save(); // Save the new listing to the database
    console.log(savedListing);
    req.flash("success", "New Listing Created"); // Flash success message
    res.redirect("/listings"); // Redirect to the index page
};










// Route to render the form for editing a listing
module.exports.editListing = async (req, res) => {
    let { id } = req.params; // Extract the listing ID from the request parameters
    const listing = await Listing.findById(id); // Find the listing by ID
    if (!listing) {
        req.flash("error", "Listing Does not exist !");
        return res.redirect("/listings");
    }


let originalImageUrl=listing.image.url;
originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");


    res.render("listings/edit.ejs", { listing ,originalImageUrl}); // Render the edit form with the retrieved listing
};








// Route to update a listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params; // Extract the listing ID from the request parameters
   let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Update the listing

if(typeof req.file !=="undefined"){
   let url= req.file.path;
   let filename=req.file.filename;

   listing.image={url,filename};
   await listing.save();
}
    req.flash("success", "Listing Updated !");
    res.redirect(`/listings/${id}`); // Redirect to the show page for the updated listing
};









// Route to delete a listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params; // Extract the listing ID from the request parameters
    let deletedListing = await Listing.findByIdAndDelete(id); // Delete the listing by ID
    console.log(deletedListing); // Log the deleted listing
    req.flash("success", "Listing Deleted !");
    res.redirect("/listings"); // Redirect to the index page
};
