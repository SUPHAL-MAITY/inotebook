const mongoose= require('mongoose');
const mongoUri="mongodb+srv://suphalrohit:JkSPNgh2QzTLqjyJ@cluster0.9vfrosu.mongodb.net/"



async function connectToMongo() {
        await mongoose.connect(mongoUri).then(()=>
         console.log("Connected to Mongo Successfully"))
         .catch(err => console.log(err));
      }
    
    


module.exports= connectToMongo ;