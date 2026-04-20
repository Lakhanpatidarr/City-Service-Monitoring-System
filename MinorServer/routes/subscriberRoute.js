const express = require("express");
const router = express.Router();


const {subScriber} = require("../controllers/Subscriber");
router.post("/", subScriber);
module.exports = router;