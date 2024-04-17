const mongoose= require ("mongoose");  // requireing mongoose in file
const Schema = mongoose.Schema;  // defining Schema as mongoose.schema object function 


const reviewSchema = new Schema ({  // schema for reviews 
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,

    },
    createdAt:{
        type:Date,
        default:Date.now(),

    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },


});

module.exports = mongoose.model("Review",reviewSchema); // exporting the schema 
