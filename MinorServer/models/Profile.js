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
        require:true,
    },
    address:{
        type:String,
        require:true,
    }
})


module.exports = mongoose.model("Profile",profileSchema);