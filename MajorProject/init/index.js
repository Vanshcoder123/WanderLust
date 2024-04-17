const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'; // copy the code from mongoose ejs page then make a async function 
main().then(()=>{ // calling mongoose initiation function 
  console.log("connected to DB");

}).catch(err =>{
    console.log(err);
});

async function main (){ // mongoose initiation function 
await mongoose.connect(MONGO_URL);

}

const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6605f1bbc42e626f00274434"}));
    await Listing.insertMany(initData.data);
    console.log("data was initated or saved");


}

initDB();