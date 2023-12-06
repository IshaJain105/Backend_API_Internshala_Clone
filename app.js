require("dotenv").config({path:"./.env"});
const express = require("express");
const app =express();

//logger
const logger= require("morgan");
const { generatedErrors } = require("./middlewares/error");
const ErrorHandler = require("./utils/ErrorHandler");
app.use(logger("tiny"));

//routes
app.use("/",require("./routes/indexRoutes"));

//errors
app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`requested URL not found ${req.url}`,404));
});
//to show errors in json format
app.use(generatedErrors);


app.listen(
    process.env.PORT,
    console.log(`server running on port ${process.env.PORT}`))

