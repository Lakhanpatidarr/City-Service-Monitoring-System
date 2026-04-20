const User = require("../models/User");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
require("dotenv").config();
const mailSender = require("../utils/mailSender");

exports.sendOTP = async(req,res)=> {
    try {
        const {email} = req.body;
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:"User Already Registered",
            });
        }
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        let result = await Otp.findOne({otp:otp});
        while(result) {
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result = await Otp.findOne({otp:otp});
        }
        const otpPayload = {email,otp};
        const otpBody = await Otp.create(otpPayload);
        return res.status(200).json({
            success:true,
            message:"Otp Send Successfully",
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};




exports.signUp = async(req,res) => {
    try {
        const{fullname,email,password,confirmPassword,dob,select,otp} = req.body;
        if(!fullname || !email || !password || !confirmPassword || !otp)
        {
            return res.status(403).json({
                success:false,
                message:"All Fields Are Required"
            });
        }
        if(password!==confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password And ConfirmPassword Does Not Match, Please Try Again",
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User Already Registered",
            });
        }
        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.length===0)
        {
            return res.status(400).json({
                success:false,
                message:"Otp Not Found",
            });
        }
        const latestOtp = recentOtp[0];
        if(otp!=latestOtp.otp)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Otp"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const profileDetails = await Profile.create({
            fullname:null,
            email:null,
            phoneno:null,
            address:null
        });
        const user = await User.create({fullname,email,password:hashedPassword,accountType:"Public",additionalDetails:profileDetails._id,dob,select,image:`https://api.dicebear.com/5.x/initials/svg?seed=${fullname}`,});
        return res.status(201).json({
            success:true,
            message:"User Is Registered Successfully",
            user,
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered. Please try again',
        });
    }
}





exports.login = async(req,res)=> {
    try {
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required, Please Try Again",
            });
        }
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User Is Not Registered, Please SignUp First",
            });
        }
        if(await bcrypt.compare(password,user.password))
        {
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
                department:user.department
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;
            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully",
            });
        }
        else {
            return res.status(401).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure Please Try Again",
        });
    }
};



exports.changePassword = async(req,res)=>{
    try {
        const {email,password,newPassword,confirmNewPassword} = req.body;
        if(!password || !newPassword || !confirmNewPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Please Filled All The Details Carefully",
            });
        }
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User Not Found",
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({
                success:false,
                message:"Old Password Is Incorrect",
            });
        }
        if(newPassword!=confirmNewPassword)
        {
            return res.status(400).json({
                success:false,
                message:"New Password Does Not Match Confirm Password",
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save();
        await mailSender(email,"Password Updated Successfully","Your password has been changed successfully. If you did not perform this action, please contact support immediately.");
        return res.status(200).json({
            success:true,
            message:"Password Change Successfully",
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Can't Change The Password, Please Try Again",
        });
    }
}