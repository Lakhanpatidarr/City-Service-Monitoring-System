const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
    accountType:{
        type:String,
        enum:["SuperAdmin","Admin","Public","Officer"],
        default: "Public",
        require:true,
    },
    department: {
        type: String,
        enum: ["Police Department", "Municipal Department", "Fire Department", "Health Department", "Tourism Department", "Infrastructure Department", "General Department"],
        required: function () {
            return this.accountType === "Admin" || this.accountType === "Officer";
        }
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Profile"
    },
    select:{
        type:String,
        require:true,
    },
    dob:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
});
module.exports = mongoose.model("User",userSchema);