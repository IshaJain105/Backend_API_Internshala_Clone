exports.sendtoken=(student,statusCode,res) => {
    const token=student.getjwtToken();
    // res.json({token});

    const option={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true,
        // secure:true
    };
    res.status(statusCode)
        .cookie("token",token,option)
        .json({sucess:true,id:student._id,token});
}