const Subscriber = require("../models/Subscriber");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");



exports.subScriber = async(req,res) => {
    try {
        const {email} = req.body;
        if(!email) {
            return res.status(400).json({
                success:false,
                message:"Email is required",
            });
        }
        const checkUserPresent = await User.findOne({email});
        if(!checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:"User not registered",
            });
        }
        const alreadySubscribe = await Subscriber.findOne({email});
        if(alreadySubscribe) {
            return res.status(400).json({
                success:false,
                message:"User already subscribed",
            });
        }
        await Subscriber.create({email});
        await mailSender(email,"Indore City Service Plateform","Thank You For Subscribing !");
        return res.status(200).json({
            success:true,
            message:"Subscribe successfully",
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Error while subscribing",
        });
    }
}