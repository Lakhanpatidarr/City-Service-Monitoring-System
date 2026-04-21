const mongoose = require("mongoose");



const profileSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phoneno:{
        type:Number,
        default: null
    },
    address:{
        type:String,
        default: ""
    }
})


module.exports = mongoose.model("Profile",profileSchema);