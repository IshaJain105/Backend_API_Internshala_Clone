const express= require("express");
const { resume , addEducation, editEducation ,deleteEducation, addJob, editJob ,deleteJob, addinternship, editinternship ,deleteinternship, addresponsibilities, editresponsibilities ,deleteresponsibilities} = require("../Controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");
const router=express.Router();

//GET /
router.get("/",isAuthenticated,resume);

//------------------------------------Education------------------------------
//POST /add-edu
router.post("/add-edu",isAuthenticated ,addEducation);

//POST /edit-edu/eduid
router.post("/edit-edu/:eduid",isAuthenticated ,editEducation);

//POST /delete-edu/eduid
router.post("/delete-edu/:eduid",isAuthenticated ,deleteEducation);

//------------------------------------Jobs------------------------------
//POST /add-job
router.post("/add-job",isAuthenticated ,addJob);

//POST /edit-job/jobid
router.post("/edit-job/:jobid",isAuthenticated ,editJob);

//POST /delete-job/jobid
router.post("/delete-job/:jobid",isAuthenticated ,deleteJob);

//------------------------------------internship------------------------------
//POST /add-internship
router.post("/add-internship",isAuthenticated ,addinternship);

//POST /edit-internship/internshipid
router.post("/edit-internship/:internshipid",isAuthenticated ,editinternship);

//POST /delete-internship/internshipid
router.post("/delete-internship/:internshipid",isAuthenticated ,deleteinternship);

//------------------------------------responsibilities------------------------------
//POST /add-responsibilities
router.post("/add-responsibilities",isAuthenticated ,addresponsibilities);

//POST /edit-responsibilities/responsibilitiesid
router.post("/edit-responsibilities/:responsibilitiesid",isAuthenticated ,editresponsibilities);

//POST /delete-responsibilities/responsibilitiesid
router.post("/delete-responsibilities/:responsibilitiesid",isAuthenticated ,deleteresponsibilities);

module.exports=router