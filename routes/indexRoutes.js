const express= require("express");
const { homepage ,currentUser, studentSignUp,studentLogin,studentLogout } = require("../Controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router=express.Router();

//GET /
router.get("/",isAuthenticated,homepage);

//POST /student/signup
router.post("/student",isAuthenticated,currentUser);

//POST /student/signup
router.post("/student/signup",studentSignUp);

//POST /student/login
router.post("/student/login",studentLogin);

//GET /student/logout
router.get("/student/logout",isAuthenticated,studentLogout);


module.exports=router