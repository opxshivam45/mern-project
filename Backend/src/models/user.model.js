const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        unique :[true,"username already exist"],
        required : true,
    },
    email:{
        type :String,
        unique : [true,"account already exxist wwith this email"],
        required : true,
    },
    password :{
        type :String,
        required:true
    }
})
const usermodel = mongoose.model("users",userSchema)
module.exports = usermodel;