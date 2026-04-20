const mongoose = require("mongoose");
const Rating = require("../models/Rating");


const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    zone:{
        type:String,
        require:true,
    },
    rating:{
        type:Number,
        require:true,
        min:1,
        max:10,
    }
})
module.exports = mongoose.model("Rating",ratingSchema);