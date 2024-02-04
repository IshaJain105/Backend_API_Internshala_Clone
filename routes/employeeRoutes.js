const express= require("express");
const { homepage ,currentEmployee, employeeSignUp,employeeLogin,employeesendmail,employeeLogout,employeeforgetlink,employeeresetpassword,employeeupdate,employeeavatar,createinternship, readinternship ,readsingleinternship, createjob, readjob ,readsinglejob} = require("../Controllers/employeeController");
const { isAuthenticated } = require("../middlewares/auth");
const router=express.Router();

//GET /employee/
router.get("/",isAuthenticated,homepage);

//POST /employee/
router.post("/",isAuthenticated,currentEmployee);

//POST /employee/signup
router.post("/signup",employeeSignUp);

//POST /employee/login
router.post("/login",employeeLogin);

//GET /employee/logout
router.get("/logout",isAuthenticated,employeeLogout);

//POST /employee/send-mail
router.post("/send-mail",employeesendmail);

//GET /employee/forget-link/:employeeid
router.get("/forget-link/:id",employeeforgetlink);

//POST /employee/reset-password
router.post("/reset-password",isAuthenticated,employeeresetpassword);

//POST /employee/update/id
router.post("/update/:id",isAuthenticated,employeeupdate);

//POST /employee/avatar/id
router.post("/employeeavatar/:id",isAuthenticated,employeeavatar);


// -------------------Internship--------------------

//POST /employee/internship/create
router.post("/internship/create",isAuthenticated,createinternship);

//POST /employee/internship/read
router.post("/internship/read",isAuthenticated,readinternship);

//POST /employee/internship/readsingle/:id
router.post("/internship/readsingle/:id",isAuthenticated,readsingleinternship);

// -------------------job--------------------

//POST /employee/job/create
router.post("/job/create",isAuthenticated,createjob);

//POST /employee/job/read
router.post("/job/read",isAuthenticated,readjob);

//POST /employee/job/readsingle/:id
router.post("/job/readsingle/:id",isAuthenticated,readsinglejob);

module.exports=router