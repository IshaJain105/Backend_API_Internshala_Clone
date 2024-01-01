const express= require("express");
const { homepage , studentSignUp,studentLogin,studentLogout } = require("../Controllers/indexController");
const router=express.Router();

//GET /
router.get("/",homepage);

//POST /student/signup
router.post("/student/signup",studentSignUp);

//POST /student/login
router.post("/student/login",studentLogin);

//GET /student/logout
router.get("/student/logout",studentLogout);


module.exports=router