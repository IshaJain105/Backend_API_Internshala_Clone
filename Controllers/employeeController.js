const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employee=require("../models/employeeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
const imagekit=require("../utils/imagekit").initImagekit();
const path=require("path");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");

// /homepage
exports.homepage= catchAsyncErrors(async(req,res,next)=>{
    res.json({message:"Secured homepage"});
});

// /employee
exports.currentEmployee= catchAsyncErrors(async(req,res,next)=>{
    const employee= await Employee.findById(req.id).exec();
    res.json({employee});
});

// /employee/signup
exports.employeeSignUp= catchAsyncErrors(async(req,res,next)=>{
    const employee= await new Employee(req.body).save();
    sendtoken(employee,201,res);
    res.status(201).json(employee);
});

// /employee/login
exports.employeeLogin= catchAsyncErrors(async(req,res,next)=>{
    const employee = await Employee.findOne({email: req.body.email}).select("+password").exec();

    //if employee doesn't exist
    if(!employee) return next(new ErrorHandler("User Not Found with this email address",404));

    //comapre password
    const isMatch = employee.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Creds",500));

    sendtoken(employee,201,res)

    res.json(employee);

});

// /employee/logout
exports.employeeLogout= catchAsyncErrors(async(req,res,next)=>{
    res.clearCookie("token");
    res.json({message:"Logout Successful"});
});

// /employee/send-mail
exports.employeesendmail=catchAsyncErrors(async(req,res,next)=>{
    //find employee with email id
    const employee = await Employee.findOne({ email: req.body.email}).exec();

    if(!employee)
        return next(new ErrorHandler("User with this email not found",404));
    const url=`${req.protocol}://${req.get("host")}/employee/forget-link/${employee._id}`;

    sendmail(req,res,next,url);
    employee.resetPasswordLink="1";
    await employee.save();
    res.json({employee,url});
});

// /employee/forget-link/:id
exports.employeeforgetlink=catchAsyncErrors(async(req,res,next)=>{
    //find employee with email id
    const employee = await Employee.findById(req.params.id).exec();

    if(!employee)
        return next(new ErrorHandler("User with this email not found",404));
        //if resetPasswordLink is eq 1 then only resset the password
        if(employee.resetPasswordLink == "1"){
            employee.resetPasswordLink="0";
            employee.password= req.body.password;
            await employee.save();
        }else{
            return next(new ErrorHandler("Link already used once! Please generate another link",500))
        }
        res.status(200).json({
            message: "Password changed successfully"
        })

});

// /employee/reset-password
exports.employeeresetpassword=catchAsyncErrors(async(req,res,next)=>{
    //find employee with email id
    const employee = await Employee.findById(req.id).exec();
    employee.password= req.body.password;
    await employee.save();
    sendtoken(employee,201,res);

});

// /employee/update
exports.employeeupdate= catchAsyncErrors(async(req,res,next)=>{
    await Employee.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(201).json({
        success: true,
        message:"Successfully Updated",
    });
});

// /employee/avatar/id
exports.employeeavatar= catchAsyncErrors(async(req,res,next)=>{
    const employee= await Employee.findById(req.params.id).exec();
    const file=req.files.organizationlogo;
    const modifiedFileName= `resumeBuilder-${Date.now()}${path.extname(file.name)}`;
    //deleting old pic if exist
    if(employee.organizationlogo.fileId !== ""){
        await imagekit.deleteFile(employee.organizationlogo.fileId);
    }
    //storing fileId and url
    const {fileId, url}= await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    });
    
    //storing in database
    employee.organizationlogo={fileId,url};
    await employee.save();
    res.status(200).json({
        success:true,
        message: "Pic uploaded successfully!"
    });
});
//------------------------internship------------
// /employee/internship/create
exports.createinternship= catchAsyncErrors(async(req,res,next)=>{
    const employee= await Employee.findById(req.id).exec();
    const internship= await new Internship(req.body);
    internship.employee= employee._id;
    employee.internships.push(internship._id);
    await internship.save();
    await employee.save();
    res.status(201).json({success : true, internship});
});

// /employee/internship/read
exports.readinternship= catchAsyncErrors(async(req,res,next)=>{
    const { internships }= await Employee.findById(req.id).populate("internships").exec();
    res.status(200).json({success : true, internships});
});

// /employee/internship/readsingle/:id
exports.readsingleinternship= catchAsyncErrors(async(req,res,next)=>{
    const internship= await Internship.findById(req.params.id).exec();
    res.status(200).json({success : true, internship});
});

//------------------------job------------
// /employee/job/create
exports.createjob= catchAsyncErrors(async(req,res,next)=>{
    const employee= await Employee.findById(req.id).exec();
    const job= await new Job(req.body);
    job.employee= employee._id;
    employee.jobs.push(job._id);
    await job.save();
    await employee.save();
    res.status(201).json({success : true, job});
});

// /employee/job/read
exports.readjob= catchAsyncErrors(async(req,res,next)=>{
    const { jobs }= await Employee.findById(req.id).populate("jobs").exec();
    res.status(200).json({success : true, jobs});
});

// /employee/job/readsingle/:id
exports.readsinglejob= catchAsyncErrors(async(req,res,next)=>{
    const job= await Job.findById(req.params.id).exec();
    res.status(200).json({success : true, job});
});
