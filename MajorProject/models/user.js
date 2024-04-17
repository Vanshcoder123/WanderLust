const mongoose= require ("mongoose");  // requireing mongoose in file
const Schema = mongoose.Schema;  // defining Schema as mongoose.schema object function 
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema = new Schema({

    email:{
        type:String,
        required:true,
    },


})

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User",userSchema); // exporting the schema 
