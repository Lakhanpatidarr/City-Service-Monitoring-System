const User = require("../models/User");
const bcrypt = require("bcrypt");



exports.createAdmin = async(req,res) => {
    try {
        const {email,department} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        const existingAdmin = await User.findOne({accountType: "Admin",department});
        if(existingAdmin) {
            return res.status(400).json({
                success:false,
                message:"Admin already exists for this department"
            });
        }
        const updateUser = await User.findByIdAndUpdate(user._id,{
            accountType:"Admin",
            department
        },{new:true});
        return res.json({
            success:true,
            message:"User Promoted To Admin",
            user
        });

    } 
    catch(err) {
        console.log(err); 
        res.status(500).json({ 
            success:false 
        });
    }
};





exports.createOfficer = async(req,res) => {
    try {
        const {email, department } = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        const updateUser = await User.findByIdAndUpdate(user._id,{
            accountType:"Officer",
            department
        },{new:true});
        return res.json({
            success:true,
            message:"User Promoted To Officer",
            user
        });

    } 
    catch(err) {
        res.status(500).json({ 
            success:false 
        });
    }
};




exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ accountType: "Admin" });

        return res.status(200).json({
            success: true,
            data: admins,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching admins",
        });
    }
};
exports.getAllOfficers = async (req, res) => {
    try {
        const officers = await User.find({ accountType: "Officer",department: req.user.department });

        return res.status(200).json({
            success: true,
            data: officers,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching officers",
        });
    }
};