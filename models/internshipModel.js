const mongoose=require("mongoose");

const internshipModel=new mongoose.Schema({
    employee:{type: mongoose.Schema.Types.ObjectId, ref:"Employee"},
    student:[{type: mongoose.Schema.Types.ObjectId, ref:"student"}],
    profile:String,
    skills: String,
    internshiptype: {type: String, enum:["In office","Remote"]},
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibilities: String,
    stipend: {
        status: {
            type:String , 
            enum: ["Fixed","Negotiable","Performance Based","Unpaid"]
        },
        amount:Number
    },
    perks: String,
    assesmnts: String,
},{timestamps: true});

const Internship = mongoose.model("Internship",internshipModel);
module.exports=Internship;



