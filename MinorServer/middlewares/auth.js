const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async(req,res,next)=> {
    try {
        const token = req.cookies?.token || req.body?.token || req.header("Authorization").replace("Bearer ", "");
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Token Not Found",
            });
        }
        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            req.user = payload;
        }
        catch(error) {
            return res.status(400).json({
                success:false,
                message:"Token Invalid",
            });
        }
        next();
    }
    catch(error) {
        return res.status(401).json({
            success:false,
            message:"Something Went Wrong While Validating The Token",
        });
    }
};

exports.isAdmin = async(req,res,next) => {
    try {
        if(req.user.accountType!=="Admin")
        {
            return res.status(401).json({
                success:false,
                message:"This Is Protected Route For Admin Only",
            })
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"User Role Cannot Be Varified,Please Try Again",
        });
    }
};


exports.isPublic = async(req,res,next) => {
    try {
        if(req.user.accountType!=="Public")
        {
            return res.status(403).json({
                success:false,
                message:"This Is Protected Route For Public Only",
            })
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Admin Role Cannot Be Varified,Please Try Again",
        });
    }
};


exports.isOfficer = async(req,res,next) => {
    try {
        if(req.user.accountType !== "Officer")
        {
            return res.status(403).json({
                success:false,
                message:"This Is Protected Route For Officer Only",
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Officer Role Cannot Be Varified,Please Try Again",
        });
    }
};


exports.isSuperAdmin = async(req,res,next) => {
    try {
        if(req.user.accountType !== "SuperAdmin")
        {
            return res.status(403).json({
                success:false,
                message:"Only SuperAdmin Allowed",
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Please Try Again",
        });
    }
};


exports.isAdminOrSuperAdmin = (req,res,next)=>{
    if(req.user.accountType==="Admin" || req.user.accountType==="SuperAdmin"){
        next();
    } else {
        return res.status(403).json({
            success:false,
            message:"This Route Is Protected For Admin Or SuperAdmin Only"
        });
    }
}
exports.isOfficerOrAdmin = (req,res,next) => {
    if(req.user.accountType === "Officer" || req.user.accountType === "Admin" || req.user.accountType === "SuperAdmin"){
        next();
    } else {
        return res.status(403).json({
            success:false,
            message:"Only Officer/Admin can update issue"
        });
    }
}