const express = require("express");
const router = express.Router();
const User = require("../models/users");





router.get("/", (req, res)=>{
    res.render("index");

})

router.post("/", (req, res)=>{
    const {email, address, message} = req.body;
    let errors = [];
    if(!email || !address  || !message){
        errors.push({msg:"Please fill all fields"});
    }
    if(message.length < 5){
        errors.push({msg:"Your message must be 6 characters and above"})
    }
    
    if(errors.length > 0){
       res.render("", {
           errors,
           email,
           message,
           address
       })
    }else{
        const newUser = new User({
            email,
            message,
            address
        });
        newUser.save()
        .then(user=>{
            req.flash("success_msg", "Your message was successfully sent, We will get in touch soon");
            res.redirect("/")
        })
        .catch(err=> console.log(err))
    }
})
module.exports = router;