const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;

    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);
module.exports = router;