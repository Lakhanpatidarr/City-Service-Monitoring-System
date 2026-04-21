const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://city-service-monitoring-system.onrender.com/api/v1/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                let user = await User.findOne({ email }).populate("additionalDetails");
                if (!user) {
                    const profileDetails = await Profile.create({
                        fullname: profile.displayName,
                        email: email,
                        phoneno: "",
                        address: ""
                    });
                    user = await User.create({
                        fullname: profile.displayName,
                        email: email,
                        accountType: "User",
                        department: "General", 
                        additionalDetails: profileDetails._id,
                        image: `https://api.dicebear.com/5.x/initials/svg?seed=${profile.displayName}`
                    });
                }
                if (email === "lp6669349@gmail.com") {
                    user.accountType = "SuperAdmin";
                    await user.save();
                }
                const token = jwt.sign(
                    {
                        id: user._id,
                        accountType: user.accountType
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );
                return done(null, { user, token });
            } catch (err) {
                return done(err, null);
            }
        }
    )
);
module.exports = passport;