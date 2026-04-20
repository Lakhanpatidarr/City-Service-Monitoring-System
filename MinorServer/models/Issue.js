const mongoose = require("mongoose");



const issueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phoneno:{
        type:String,
        require:true,
    },
    department:{
        type:String,
        enum: ["Police Department","Municipal Department","Fire Department","Health Department","Tourism Department","Infrastructure Department"],
        require:true,
    },
    subject:{
        type:String,
        require:true,
    },
    issuetype:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    },
    location:{
        type:String,
        require:true,
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Resolved"],
        default:"Pending"
    },
});
module.exports = mongoose.model("Issue",issueSchema);