const express = require('express');
const router = express.Router();


const {updateProfile,deleteAccount,getAllUserDetails} = require("../controllers/Profile");
const {auth} = require("../middlewares/auth");



router.put("/update",auth,updateProfile);
router.get("/me",auth,getAllUserDetails);
router.delete("/delete",auth,deleteAccount);


module.exports = router;