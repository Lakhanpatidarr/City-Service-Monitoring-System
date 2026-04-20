const express = require("express");
const router = express.Router();
const {auth,isAdmin, isSuperAdmin,isAdminOrSuperAdmin} = require("../middlewares/auth");
const {createAdmin,createOfficer,getAllAdmins,getAllOfficers} = require("../controllers/Admin");

router.post("/create-admin", auth, isSuperAdmin, createAdmin);
router.post("/create-officer", auth, isAdminOrSuperAdmin, createOfficer);
router.get("/get-all-admins", auth, isSuperAdmin, getAllAdmins);
router.get("/get-all-officers",auth,isAdmin,getAllOfficers)


module.exports = router;