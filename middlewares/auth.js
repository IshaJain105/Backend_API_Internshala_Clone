const jwt=require("jsonwebtoken");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");


exports.isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login to access this page",401))
    };
    const {id}=jwt.verify(token,process.env.JWT_SECRET);
    req.id=id;
    next();
})