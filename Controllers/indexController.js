const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student=require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");


// /homepage
exports.homepage= catchAsyncErrors(async(req,res,next)=>{
    res.json({message:"Secured homepage"});
});

// /student
exports.currentUser= catchAsyncErrors(async(req,res,next)=>{
    const student= await Student.findById(req.id).exec();
    res.json({student});
});

// /student/signup
exports.studentSignUp= catchAsyncErrors(async(req,res,next)=>{
    const student= await new Student(req.body).save();
    sendtoken(student,201,res);
    res.status(201).json(student);
});


// /student/login
exports.studentLogin= catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findOne({email: req.body.email}).select("+password").exec();

    //if student doesn't exist
    if(!student) return next(new ErrorHandler("User Not Found with this email address",404));

    //comapre password
    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Creds",500));

    sendtoken(student,201,res)

    res.json(student);

});

// /student/logout
exports.studentLogout= catchAsyncErrors(async(req,res,next)=>{
    res.clearCookie("token");
    res.json({message:"Logout Successful"});
});
