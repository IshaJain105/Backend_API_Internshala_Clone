require("dotenv").config({path:"./.env"});
const express = require("express");
const app =express();

//db connection
require("./models/database").connectDatabase();

//logger
const logger= require("morgan");
const { generatedErrors } = require("./middlewares/error");
const ErrorHandler = require("./utils/ErrorHandler");
app.use(logger("tiny"));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//session and cookies
const session= require("express-session");
const cookieparser= require("cookie-parser");
//activate session
app.use(session({
    resave: true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
//create cookie
app.use(cookieparser());

//express-fileupload
const fileupload=require("express-fileupload");
app.use(fileupload());

//routes
app.use("/user",require("./routes/indexRoutes"));
app.use("/resume",require("./routes/resumeRoutes"));
app.use("/employee",require("./routes/employeeRoutes"));

//errors
app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`requested URL not found ${req.url}`,404));
});
//to show errors in json format
app.use(generatedErrors);


app.listen(
    process.env.PORT,
    console.log(`server running on port ${process.env.PORT}`))

