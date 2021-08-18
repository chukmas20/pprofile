if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }


const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const userRoute = require("./routes/routes.js")
const {check, validationResult} = require("express-validator");
const flash = require("connect-flash");
const app = express();


//dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
    secret:"secret",
    resave:"true",
    saveUninitialized:"true"
}))

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    //res.locals.error_msg = req.flash("error_msg")
    next();
})

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false

   }
).then(console.log("Connected to database")).catch((err)=> console.log(err));

app.use("/", userRoute);


const PORT = process.env.Port  || 2000;

app.listen(PORT, ()=>{
    console.log(`App running on port${PORT}`);
})