const express= require("express");
const { homepage ,currentUser, studentSignUp,studentLogin,studentsendmail,studentLogout,studentforgetlink,studentresetpassword,studentupdate,studentavatar,applyinternship, applyjob } = require("../Controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router=express.Router();

//GET /
router.get("/",isAuthenticated,homepage);

//POST /student
router.post("/student",isAuthenticated,currentUser);

//POST /student/signup
router.post("/student/signup",studentSignUp);

//POST /student/login
router.post("/student/login",studentLogin);

//GET /student/logout
router.get("/student/logout",isAuthenticated,studentLogout);

//POST /student/send-mail
router.post("/student/send-mail",studentsendmail);

//GET /student/forget-link/:studentid
router.get("/student/forget-link/:id",studentforgetlink);

//POST /student/reset-password
router.post("/student/reset-password",isAuthenticated,studentresetpassword);

//POST /student/update
router.post("/student/update/:id",isAuthenticated,studentupdate);

//POST /student/avatar
router.post("/student/avatar",isAuthenticated,studentavatar);


//---------------------apply internship--------------
//POST /student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship);


// //---------------------apply job--------------
//POST /student/apply/job/:jobid
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob);

module.exports=router