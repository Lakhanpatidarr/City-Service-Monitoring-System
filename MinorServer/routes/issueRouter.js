const express = require("express");
const router = express.Router();
const {Issue, getAllIssues, getPendingIssues, getResolvedIssues, getUserIssues, updateIssueStatus} = require("../controllers/Issue");
const {auth, isOfficerOrAdmin} = require("../middlewares/auth");





router.post("/create", auth, Issue);
router.get("/all", auth,getAllIssues);
router.get("/my",auth,getUserIssues);
router.get("/pending",auth,getPendingIssues);
router.get("/resolved",auth,getResolvedIssues);
router.post("/update-status",auth,isOfficerOrAdmin,updateIssueStatus);
module.exports = router;