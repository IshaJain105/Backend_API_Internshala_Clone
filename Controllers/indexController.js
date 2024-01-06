const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student=require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
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

// /student/send-mail
exports.studentsendmail=catchAsyncErrors(async(req,res,next)=>{
    //find student with email id
    const student = await Student.findOne({ email: req.body.email}).exec();

    if(!student)
        return next(new ErrorHandler("User with this email not found",404));
    const url=`${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;

    sendmail(req,res,next,url);
    student.resetPasswordLink="1";
    await student.save();
    res.json({student,url});
});

// /student/forget-link/:id
exports.studentforgetlink=catchAsyncErrors(async(req,res,next)=>{
    //find student with email id
    const student = await Student.findById(req.params.id).exec();

    if(!student)
        return next(new ErrorHandler("User with this email not found",404));
        //if resetPasswordLink is eq 1 then only resset the password
        if(student.resetPasswordLink == "1"){
            student.resetPasswordLink="0";
            student.password= req.body.password;
            await student.save();
        }else{
            return next(new ErrorHandler("Link already used once! Please generate another link",500))
        }
        res.status(200).json({
            message: "Password changed successfully"
        })

});

// /student/reset-password
exports.studentresetpassword=catchAsyncErrors(async(req,res,next)=>{
    //find student with email id
    const student = await Student.findById(req.id).exec();
    student.password= req.body.password;
    await student.save();
    sendtoken(student,201,res);

});

