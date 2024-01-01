const bcrypt= require("bcryptjs");
const mongoose=require("mongoose");

const studentModel=new mongoose.Schema({
    email:{
        type: String,
        unique:true,
        require:[true,"Emial is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Email address is invalid"]
    },
    password: {
        type: String,
        select:false,
        maxLength: [15,"Password should not exceed more then 15 characters"],
        minLength: [6,"Password should have atleast 6 characters"],
        // match:[],

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

const Student = mongoose.model("student",studentModel);
module.exports=Student;



