const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");



const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300,
    },
    expireAt:{
        type:Date,
        require:true,
    }
});





async function sendVerificationEmail(email,otp) {
    try {
        const mailResponse = await mailSender(email,"Verification Email From Indore City Service",otp)
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}
otpSchema.pre("save",async function() {
    await sendVerificationEmail(this.email,this.otp);
})



module.exports = mongoose.model("OTP",otpSchema);