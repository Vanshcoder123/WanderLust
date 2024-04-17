// this file is for defining the schema for listing data in mongoose

const mongoose = require("mongoose"); // requireing mongoose in file
const Schema = mongoose.Schema; // defining Schema as mongoose.schema object function
const Reviews = require("./reviews.js"); // requiring reviews.js to delete reviews whwn we delete the whole listing
const listingSchema = new Schema({
  // this is the defined schema for mongoose listing data set
  title: {
    type: String,
    required: true, // this is required so user has to put a value in it
  },
  description: String,





  image: {
    
   url:String,
   filename:String,





  },






  price: Number,
  location: String,
  country: String,

  reviews: [
    // this field is associated with reviews
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },


  geometry:{
    type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ['Point'], // 'location.type' must be 'Point'
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
},

});

listingSchema.post("findOneAndDelete", async (listings) => {
  if (listings) {
    await Reviews.deleteMany({ _id: { $in: listings.reviews } });
  }
  console.log("reviews deleted");
});

const Listing = mongoose.model("Listing", listingSchema); // exporting the listing schema from the file
module.exports = Listing; // exporting the module using module.export funtion
