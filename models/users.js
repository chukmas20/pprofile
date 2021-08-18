const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },   
}, {timestamps:true});


module.exports = mongoose.model("User", userSchema);