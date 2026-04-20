const mongoose = require("mongoose");



const subscriberSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        createdAt: Date,
    }
})



module.exports = mongoose.model("Subscriber",subscriberSchema);