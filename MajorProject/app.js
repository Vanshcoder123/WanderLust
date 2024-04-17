// Basic setups of wanderlust project 
// (npm init -y), (npm i ejs), (npm i nodemon (also change the code in package.json),(npm i method-override),(npm i ejs-mate)),(npm i connect-flash), (npm i express-session)

if(!process.env.NODE_ENV !="production"){
require('dotenv').config();
}



const express= require("express"); // require express (npm i express)
const app = express(); // start express as app 
const mongoose= require ("mongoose"); // require mongoose (npm i mongoose)
      // const Listing = require("./models/listing.js"); // please note we have to use a single dot (this is to require the exported module file in app.js )
const path = require("path"); // requiring the path for ejs folder
const methodOverride= require("method-override"); // require method-override (npm i method-override)
const ejsMate= require("ejs-mate"); // requiring ejs-mate , this package will help us to create layouts 
      // const wrapAsync=require("./utils/wrapAsync.js");// require the utils wrapAsync ffunction from utils directory for error handeling 
const ExpressError=require("./utils/ExpressError.js"); // require the Expresserror class from utils directory for custom error message 
      // const {listingSchema , reviewSchema}=require("./schema.js"); // require listing schema and review schema to validate form and review data 
      // const Reviews = require("./models/reviews.js"); // requireing reviwews.js file 
      
const session= require("express-session"); // Require express-session package for managing sessions
const flash=require("connect-flash"); // Require connect-flash package for flash messages
const passport = require("passport"); // Require passport package for authentication
const LocalStrategy=require("passport-local"); // Require passport-local package for local authentication strategy
const User=require("./models/user.js"); // Require User model for authentication
      
const listingsRouter=require("./routes/listing.js"); // Require route module for listings
const reviewsRouter= require("./routes/review.js"); // Require route module for reviews
const userRouter=require("./routes/user.js");


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'; // copy the code from mongoose ejs page then make a async function 
main().then(()=>{ // calling mongoose initiation function 
  console.log("connected to DB");

}).catch(err =>{
    console.log(err);
});

async function main (){ // mongoose initiation function 
await mongoose.connect(MONGO_URL);

}

app.set("view engine","ejs"); // setting view engine using express app.set funtion to get the ejs files as view engine
app.set("views",path.join(__dirname,"views")); // setting the path join to dirname which is named as views 
app.use(express.urlencoded({extended:true})); // this will allow the extended encoded data to be readable by express , here we are using an function object of express named express.urlencoded
app.use(methodOverride("_method")); // using the function of method override as _method
app.engine('ejs', ejsMate);  // copy the code form ejs mate documentation , there we are using ejs mate (this is connected to the layouts file in views file )
app.use(express.static(path.join(__dirname,"/public"))); // this code will join the static files ie CSS files



const sessionOptions={    // Configuration options for the session middleware
  secret:"mysupersecrectcode",// Secret used to sign the session ID cookie to prevent tampering
  resave:false,   // Whether to save the session even if it hasn't been modified during the request
  saveUninitialized:true,   // Forces a session that is "uninitialized" to be saved to the store
  cookie:{  // Configuration options for the session cookie
    expires:Date.now()+ 7*24*60*60*1000,  // Setting the expiration date for the session cookie
    maxAge:7*24*60*60*1000, // Max age of the session cookie in milliseconds
    httpOnly:true,  // Ensures that the cookie is not accessible via client-side scripts
  },
};



// part 1---- root route 
app.get ("/",(req,res)=>{
res.render("landing.ejs");
});


app.use(session(sessionOptions)); // Setting up session middleware with provided sessionOptions
app.use(flash()); // Setting up flash middleware to enable flash messages



app.use(passport.initialize()); // Initialize passport middleware for authentication
app.use(passport.session()); // Use passport middleware for managing sessions

passport.use(new LocalStrategy(User.authenticate())); // Configure passport to use local authentication strategy with User model

passport.serializeUser(User.serializeUser()); // Serialize user data for session storage
passport.deserializeUser(User.deserializeUser()); // Deserialize user data from session storage

app.use((req,res,next)=>{  // Middleware to set a local variable 'success' with flash messages
  res.locals.success=req.flash("success");// Set the local variable 'success' to the flash message retrieved from the request
  res.locals.error=req.flash("error");
  res.locals.currentUser=req.user;
  next();// Move to the next middleware in the stack

});



app.use("/listings",listingsRouter);  // this line is to use listing.js whenever we want to use listing related paths or routes (it all happend after destructuring of the paths )

app.use("/listings/:id/reviews", reviewsRouter);  // this line is to use reviews.js whenever we want to use listing related paths or routes (it all happend after destructuring of the paths )

app.use("/",userRouter);






app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"path not found !"));
});

app.use((err,req,res,next)=>{  // this is a middle ware to handle error 
let{statusCode=500,message="something went wrong !"}=err;
res.status(statusCode).render("error.ejs", { message }); // Render the error template with status code



});







// to see if server is working or not 
app.listen(8080,()=>{ // using express function app ( app=express)to get if app is listening to port or not 
console.log("server listening to 8080 !");
});

