const mongoose =require("mongoose");
const { Schema } = mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now
    }
})

////a Mongoose model named User. It appears to be part of a Mongoose schema definition, where it's creating a model based on a previously defined schema named UserSchema
const User=mongoose.model('user',UserSchema)


module.exports=User;