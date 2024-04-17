
const user= require("../models/user.js"); // Importing the User model for user operations.


//to render signup form 


module.exports.renderSignUpForm=(req,res)=>{ 
    res.render("users/signup.ejs"); // Render the signup form
};










// to make signup and do things after signup
module.exports.signUp=(async(req,res)=>{ 
    try{
let {username , email,password}=req.body; // Extracting username, email, and password from request body
const newUser= new user({email,username}); // Creating a new user instance
const registerdUser=await user.register(newUser,password); // Registering the new user
console.log(registerdUser); // Logging registered user data
req.login(registerdUser,(err)=>{ // Logging in the registered user
if(err){ 
    return next(err);
}
req.flash("success","user was registerd"); // Flash success message
res.redirect("/listings"); // Redirect to listings page
});

    }catch(e){
        req.flash("error", e.message); // Flash error message
        res.redirect("/signup"); // Redirect back to signup page
    }
});











// to render login form 

module.exports.renderLoginForm=(req,res)=>{ 
    res.render("users/login.ejs"); // Render the login form
    };











// to make login and do things after login 
 module.exports.logIn=async(req,res)=>{ // Authenticate user with local strategy
        req.flash("success","welcome to wanderlust !"); // Flash success message
        let redirectUrl=res.locals.redirectUrl||"/listings";
       res.redirect(redirectUrl); // Redirect to listings page
   
   console.log("it worked");
      
   };









// to make logout 
   module.exports.logOut=(req,res)=>{ 


    req.logout((err)=>{ // Logout the user
    
        if(err){ 
           return  next(err);
        }
    req.flash("success","you are successfully logged out !"); // Flash success message
    res.redirect("/listings"); // Redirect to listings page
    })
    
    };