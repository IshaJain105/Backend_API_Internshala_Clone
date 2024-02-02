const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student=require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

const path=require("path");

// /resume
exports.resume= catchAsyncErrors(async(req,res,next)=>{
    const {resume} = await Student.findById(req.id).exec();
    res.json({message:"Secured resume page",resume});
});

//------------------------------------Education------------------------------

// /add-edu
exports.addEducation =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({message: "Education Added"});
})

// /edit-edu
exports.editEducation =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex= student.resume.education.findIndex((i)=> i.id === req.params.eduid)
    student.resume.education[eduIndex]={...student.resume.education[eduIndex], ...req.body};
    await student.save();
    res.json({message: "Education Updated"});
})

// /delete-edu
exports.deleteEducation =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredEdu= student.resume.education.filter((i)=> i.id !== req.params.eduid)
    student.resume.education=filteredEdu;
    await student.save();
    res.json({message: "Education Deleted"});
})

//------------------------------------Job------------------------------

// /add-job
exports.addJob =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({message: "Job Added"});
})

// /edit-job/jobid
exports.editJob =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const jobIndex= student.resume.jobs.findIndex((i)=> i.id === req.params.jobid)
    student.resume.jobs[jobIndex]={...student.resume.jobs[jobIndex], ...req.body};
    await student.save();
    res.json({message: "Job Updated"});
})

// /delete-job/jobid
exports.deleteJob =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredjob= student.resume.jobs.filter((i)=> i.id !== req.params.jobid)
    student.resume.jobs=filteredjob;
    await student.save();
    res.json({message: "Job Deleted"});
})

//------------------------------------internship------------------------------

// /add-internship
exports.addinternship =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.internship.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({message: "internship Added"});
})

// /edit-internship
exports.editinternship =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const internshipIndex= student.resume.internship.findIndex((i)=> i.id === req.params.internshipid)
    student.resume.internship[internshipIndex]={...student.resume.internship[internshipIndex], ...req.body};
    await student.save();
    res.json({message: "internship Updated"});
})

// /delete-internship
exports.deleteinternship =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredinternship= student.resume.internship.filter((i)=> i.id !== req.params.internshipid)
    student.resume.internship=filteredinternship;
    await student.save();
    res.json({message: "internship Deleted"});
})

//------------------------------------responsibilities------------------------------

// /add-responsibilities
exports.addresponsibilities =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilitiess.push({...req.body,id:uuidv4()});
    await student.save();
    res.json({message: "responsibilities Added"});
})

// /edit-responsibilities/responsibilitiesid
exports.editresponsibilities =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const resIndex= student.resume.responsibilitiess.findIndex((i)=> i.id === req.params.responsibilitiesid)
    student.resume.responsibilities[resIndex]={...student.resume.responsibilities[eduIndex], ...req.body};
    await student.save();
    res.json({message: "responsibilities Updated"});
})

// /delete-responsibilities/responsibilitiesid
exports.deleteresponsibilities =catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredresponsibilities= student.resume.responsibilities.filter((i)=> i.id !== req.params.responsibilitiesid)
    student.resume.responsibilities=filteredresponsibilities;
    await student.save();
    res.json({message: "responsibilities Deleted"});
})

