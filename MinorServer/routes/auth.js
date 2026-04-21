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
    const user = req.user.user;

    res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);
module.exports = router;