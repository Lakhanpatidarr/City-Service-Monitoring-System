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
            callbackURL: "/api/v1/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value }).populate("additionalDetails");

                if (!user) {
                    const profileDetails = await Profile.create({
                        fullname: profile.displayName,
                        email: profile.emails[0].value,
                        phoneno: "",
                        address: ""
                    });
                    user = await User.create({
                        fullname: profile.displayName,
                        email: profile.emails[0].value,
                        accountType: "User",
                        additionalDetails: profileDetails._id,
                        image: `https://api.dicebear.com/5.x/initials/svg?seed=${profile.displayName}`
                    });
                }

                const token = jwt.sign(
                    { id: user._id, accountType: user.accountType },
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