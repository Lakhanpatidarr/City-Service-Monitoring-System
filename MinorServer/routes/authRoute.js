const express = require("express");
const router = express.Router();
const passport = require("passport");


const { sendOTP, signUp, login, changePassword, } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
router.post("/send-otp", sendOTP);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/change-password", changePassword);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false, prompt: "consent select_account" }),
    (req, res) => {
        const { user, token } = req.user;
        const CLIENT_URL = process.env.CLIENT_URL;
        if (!CLIENT_URL) {
            return res.send("CLIENT_URL not set in environment variables");
        }
        res.redirect(`${CLIENT_URL}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
    }
);



module.exports = router;