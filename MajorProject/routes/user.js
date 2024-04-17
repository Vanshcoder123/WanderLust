const express = require("express"); // Importing the express module to create an Express router.
const router = express.Router(); // Creating a router instance with merging params to access parent route parameters.
const user= require("../models/user.js"); // Importing the User model for user operations.
const wrapAsync=require("../utils/wrapAsync"); // Importing utility function for error handling.
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middlewares.js");


const userControllers=require("../controllers/users.js");



router.get("/signup",userControllers.renderSignUpForm);








router.post("/signup",wrapAsync(userControllers.signUp));






router.get("/login",userControllers.renderLoginForm);






router.post("/login", saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),userControllers.logIn);










router.get("/logout",userControllers.logOut);

module.exports = router; // Export the router
