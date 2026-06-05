const { default: mongoose } = require("mongoose")

let otpSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
      type:String,
      required:true  
    },
    email:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    },
    otpString:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otpExpires:{
        type:Date,
        required:true,
        expires:0
    }
})


let OtpModel=mongoose.model("otps",otpSchema)

module.exports=OtpModel