const express=require("express");
const  User =require("../models/User");
const router=express.Router();
const { body, validationResult } = require('express-validator');


router.post("/", [
    body("name","Enter a valid name").isLength({min:3}),
    body("Email","Enter a valid email").isEmail(),
    body("password","Enter a valid password").isLength({min:3})
] ,

(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: result.array()});
    }
  
    ///It attempts to create a new user using the User.create() method, which takes an object with user credentials (name, password, email) as its argument. If the user creation is successful, it sends a JSON response containing the newly created user object. However, if there's an error, it catches the error, logs it to the console, and sends a JSON response with an error message indicating that the email address is not unique.
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
    res.json({error: 'Please enter a unique value for email', message: err.message})})

})

module.exports=router