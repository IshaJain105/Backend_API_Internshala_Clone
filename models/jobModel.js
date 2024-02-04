const mongoose=require("mongoose");

const jobModel=new mongoose.Schema({
    employee:{type: mongoose.Schema.Types.ObjectId, ref:"Employee"},
    student:[{type: mongoose.Schema.Types.ObjectId, ref:"student"}],
    title:String,
    skills: String,
    jobtype: {type: String, enum:["In office","Remote"]},
    openings: Number,
    description:String,
    preferences:String,
    salary: Number,
    perks: String,
    assesmnts: String,
},{timestamps: true});

const Job = mongoose.model("Job",jobModel);
module.exports=Job;



