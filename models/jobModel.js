const mongoose=require("mongoose");

const jobModel=new mongoose.Schema({
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

const Job = mongoose.model("job",jobModel);
module.exports=Job;



