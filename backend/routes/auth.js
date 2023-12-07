const express=require("express");
const  User =require("../models/User");
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt=require("jsonwebtoken");



const JWT_SECRET = 'suphalisag@@dboy';

///////applying validation
router.post("/createuser", [
    body("name","Enter a valid name").isLength({min:3}),
    body("email","Enter a valid email").isEmail(),
    body("password","password length must be 5").isLength({min:5})
] ,
///if there are bad errors then send bad requests 
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
   try{
    ////check wheather user exists already
    let user=await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error:"A user with this mail alreay exists"})
    }
    ///It attempts to create a new user using the User.create() method, which takes an object with user credentials (name, password, email) as its argument. If the user creation is successful, it sends a JSON response containing the newly created user object. However, if there's an error, it catches the error, logs it to the console, and sends a JSON response with an error message indicating that the email address is not unique.
    
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
    

    const data={
      user:{
        id:user.id
      }
    }
    
   
    
    const authtoken=jwt.sign(data,JWT_SECRET)
    res.json({authtoken})

    }catch(error){
      console.error(error.message)
      res.status(500).send("Internal server error occured")
    }

   

})

// authenticate a user using post:"/api/auth/login"
router.post("/login",[
  body("email","enter a valid email").isEmail(),
  body("password","password should not be blank").exists()

], async (req,res)=>{

  //if errors are there send  bad reqest
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const{email,password}=req.body;
  try {
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({errors:"Please  log in with correct credentials"});
    }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
          return res.status(400).json({errors:"Please  log in with correct credentials"});
    
        }
    
    const data={
      data:{
        id:user.id
      }
    }
  
    const authtoken=jwt.sign(data,JWT_SECRET)
    res.json({authtoken})
    
  }catch(error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    
  }
 

  

})

module.exports=router