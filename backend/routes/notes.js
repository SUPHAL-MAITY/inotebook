const express=require("express");
const router=express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required

router.get("/fetchallnotes",fetchuser,async(req,res)=>{
   try {
    const notes= await Note.find({user:req.user.id});
    res.json(notes)
    
   } catch (error) {
    console.error(error.message);
        res.status(500).send("Internal Server Error");
    
   }
   
})


// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post("/addnote",fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
],async(req,res)=>{
    try {
        const {title , description,tag}=req.body
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note=new Note({
            title,description, tag,user: req.user.id
        })
        const savednote=await note.save()
        res.json(savednote)
     
     
    } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
     
    }
    
 })


 //ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required

 router.put("/updatenote/:id",fetchuser,async(req,res)=>{

    const {title,tag,description}=req.body;

    try {

          //create a new note object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    ///find  the note to be updated
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    ////check if the logged in user and requested userid same

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    ////update
    note= await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
        
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
        
    }


 })


 ////// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required

 router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
    try {
        ///find the note to be deleted
    let note=await Note.findById(req.params.id)
    if(!note){res.status(404).send("Not Found!")}

    //check if the logged in user and requested userid same

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");

    }
    note= await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted",note:note})
        
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
        
    }

    
    
 })

 

module.exports=router