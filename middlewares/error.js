exports.generatedErrors=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    
    //if duplicate email is there 
    if(err.name === "MongoServerError" && err.message.includes(" duplicate key error")){
        err.message="EMail already exists.";
    } 

    res.status(statusCode).json({
        message:err.message,
        errName:err.name,
    });

    
};