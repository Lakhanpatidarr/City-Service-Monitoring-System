const Issue = require("../models/Issue");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploder");
const mailSender = require("../utils/mailSender");



exports.Issue = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullname, email, phoneno, department, subject, issuetype, description, location } = req.body;
        const image = req.files.image;
        if (!fullname || !email || !phoneno || !department || !subject || !issuetype || !description || !location) {
            return res.status(400).json({
                success: false,
                message: "All Field Require",
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }
        const issueImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        const newIssue = await Issue.create({
            fullname,
            email,
            phoneno,
            department,
            subject,
            issuetype,
            description,
            location,
            user: user._id,
            image: issueImage.secure_url,
        })
        await mailSender(user.email, "Thank You For Your Complaint", `Your Complaint ${issuetype} Submited Successfully, We'll contact you soon.`);
        return res.status(200).json({
            success: true,
            message: "Issue Submit Successfully",
            data: newIssue,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed Issue Submit",
        });
    }
};

exports.getAllIssues = async (req, res) => {
    try {
        if (req.user.accountType === "SuperAdmin") {
            const issues = await Issue.find({}).sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                data: issues,
            });
        }
        const issues = await Issue.find({ department: req.user.department }).populate("user", "fullname email").sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: issues,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching issues",
        });
    }
};


exports.getUserIssues = async (req, res) => {
    try {
        const userId = req.user.id;
        const issues = await Issue.find({ user: userId }).sort({ createdAt: -1 });
        return res.json({
            success: true,
            data: issues
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user issues"
        });
    }
}




exports.getPendingIssues = async (req, res) => {
    try {
        const issues = await Issue.find({
            user: req.user.id,
            status: { $in: ["Pending", "In Progress"] }
        });
        return res.json({
            success: true,
            data: issues
        });
    }
    catch (err) {
        res.status(500).json({
            success: false
        });
    }
}


exports.getResolvedIssues = async (req, res) => {
    try {
        const issues = await Issue.find({
            user: req.user.id,
            status: "Resolved",
        });
        return res.status(200).json({
            success: true,
            data: issues
        });
    }
    catch (err) {
        res.status(500).json({
            success: false
        });
    }
}




exports.updateIssueStatus = async (req, res) => {
    try {
        const { issueId, status } = req.body;
        const allowedStatus = ["Pending", "Accepted", "Resolved"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }
        const issue = await Issue.findByIdAndUpdate(
            issueId,
            { status },
            { new: true }
        ).populate("user");
        const email = issue.user.email;
        let subject = "";
        let message = "";
        if (status === "Accepted") {
            subject = "Issue Accepted ✅";
            message = `Your issue has been accepted by the officer. Our team will start working on it soon.`;
        }
        else if (status === "Resolved") {
            subject = "Issue Resolved 🎉";
            message = `Good news! Your reported issue has been resolved successfully. Thank you for your patience.`;
        } 
        else {
            subject = "Issue Status Updated";
            message = `Your issue status is now: ${status}`;
        }
        await mailSender(email, subject, message);
        return res.json({
            success: true,
            data: issue
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false
        });
    }
}