const Profile = require("../models/Profile");
const User = require("../models/User");


exports.updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneno, address } = req.body;
        const id = req.user.id;
        const phone = Number(phoneno);
        if (isNaN(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number",
            });
        }
        if (!fullname || !email || phoneno === undefined || !address) {
            return res.status(400).json({
                success: false,
                message: "All field require",
            });
        }
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }


        profileDetails.fullname = fullname;
        profileDetails.email = email;
        profileDetails.phoneno = phone;
        profileDetails.address = address;
        await profileDetails.save();
        const updatedUser = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while update profile",
        })
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        await User.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Account delete successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting account",
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: "User Data fetch Successfully",
            data: userDetails,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while get all details of user",
        });
    }
}