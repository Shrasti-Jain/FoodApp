const { default: mongoose } = require("mongoose")


let partnerOtp=new mongoose.Schema({
     businessname:{
        type:String,
        required:true
     },
     contactname:{
        type:String,
        required:true
     },
     contact:{
         type:String,
        required:true
     },
     email:{
         type:String,
        required:true
     },
     password:{
         type:String,
        required:true
     },
     address:{
         type:String
     },
     otp:{
        type:String,
        required:true
     },
     optExpires:{
        type:Date,
        required:true,
        expires:0
     } 
})

let PartnerOtpModel= mongoose.model("partnersOtps",partnerOtp)

module.exports=PartnerOtpModel
