const bcrypt= require("bcryptjs");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const studentModel=new mongoose.Schema({
    firstname:{
        type: String,
        required:[true,"Firstname is required"],
        minLength: [3,"first name should have atleast 3 characters"],
    },
    lastname:{
        type: String,
        required:[true,"Last name is required"],
        minLength: [3,"Last name should have atleast 3 characters"],
    },
    gender:{
        type: String,
        enum: ["Male","Female","Others"]
    },
    city:{
        type: String,
        required:[true,"City is required"],
        minLength: [3,"City should have atleast 3 characters"],
    },
    contact:{
        type: String,
        required:[true,"Last name is required"],
        maxLength: [10,"Contact number should not exceed more then 10 characters"],
        minLength: [10,"Contact number should have atleast 10 characters"],
    },
    email:{
        type: String,
        unique:true,
        required:[true,"Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Email address is invalid"]
    },
    password: {
        type: String,
        select:false,
        maxLength: [15,"Password should not exceed more then 15 characters"],
        minLength: [6,"Password should have atleast 6 characters"],
        // match:[],
    },
    resetPasswordLink:{
        type:String,
        default: "0"
    },
    avatar: {
        type: Object,
        default:{
            fileId: "",
            //dummy image
            url: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_400,h_400/https://useqwitter.com/wp-content/uploads/2022/08/blank-twitter-icon.jpg"
        }
    },

},{timestamps: true});

//comapre password
studentModel.methods.comparepassword=function(password){
    return bcrypt.compareSync(password,this.password);
};

//encrypt the password 
studentModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }

    let salt=bcrypt.genSaltSync(10);
    this.password=bcrypt.hashSync(this.password, salt);
});

//generate token
studentModel.methods.getjwtToken=function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    )
}

const Student = mongoose.model("student",studentModel);
module.exports=Student;



