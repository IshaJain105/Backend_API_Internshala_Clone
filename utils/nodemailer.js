const nodemailer =require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail=(req,res,next,url)=>{
    const transport= nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:process.env.MAIL_EMAIL,
            pass:process.env.MAIL_PASSWORD,
        }
    });
    const mailOptions={
        from:"Isha Pvt. Ltd.",
        to: req.body.email,
        subject: "RESET PASSWORD LINK",
        html:`<h1>Click on link below to reset your password....</h1>
                <a href="${url}">Reset Password</a>`
    };
    transport.sendMail(mailOptions,(err,info)=>{
        if(err)
         return next(new ErrorHandler(err,500));
        console.log(info);
        return res.status(200).json({
            message:"Mail sent Successfully",
            url
        });
    })
}