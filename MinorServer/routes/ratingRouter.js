const express = require("express");
const router = express.Router();


const {createRating,getThreeTopRating,getZoneAndRating,} = require("../controllers/Rating");
const { auth } = require("../middlewares/auth");
router.post("/create", auth, createRating);
router.get("/top-3", getThreeTopRating);
router.get("/all", getZoneAndRating);
module.exports = router;