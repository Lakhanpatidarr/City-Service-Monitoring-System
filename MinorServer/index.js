require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
require("./config/passport");


const authRoute = require("./routes/authRoute");
const issueRoute = require("./routes/issueRouter");
const profileRoute = require("./routes/profileRoute");
const ratingRoute = require("./routes/ratingRouter");
const subscribeRoute = require("./routes/subscriberRoute");
const adminRoute = require("./routes/AdminRoute");
const chatRoute = require("./routes/chatRoute");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;
database.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        // origin: "http://localhost:3001",
        origin: true,
        credentials: true,
    })
)
app.use(passport.initialize());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)
cloudinaryConnect();
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/rating", ratingRoute);
app.use("/api/v1/issue", issueRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/subscribe", subscribeRoute);
app.use("/api/v1/chatbot", chatRoute);

// app.get("/", (req, res) => {
//     return res.json({
//         success: true,
//         message: "Your server is up and running....",
//     });
// })
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})