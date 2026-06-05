const foodModel = require("../models/food.model")
const FoodPartnersModel = require("../models/foodPartners.model")
const PartnerOtpModel = require("../models/partnerOtp.model")
const ApiError = require("../utils/apiError")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken")
const sentMail = require("./mail.service")
const bcrypt=require('bcrypt')

let registerService=async (data)=>{
     let {businessname,email,password,contact,contactname,address}=data

    if(!businessname || !email || !password || !contact || !contactname ){
        throw new ApiError(404,"All fields are required")
    }

    let isExisted=await FoodPartnersModel.findOne({email})

    if(isExisted) throw new ApiError(409,"Partner already registered")

    let otp = Math.floor(100000 + Math.random() * 900000)
    
    let hashPassword=await bcrypt.hash(password,10)

    await PartnerOtpModel.create({
        businessname,contactname,email,contact,password:hashPassword,address,otp,optExpires:Date.now()+5*60*1000
    })
    
    await sentMail(
   email,
   "Email Verification",

   `
   <div style="font-family:sans-serif;padding:20px">
      <h2>Email Verification</h2>

      <p>Your OTP for verification is:</p>

      <h1 style="color:blue;letter-spacing:5px">
         ${otp}
      </h1>

      <p>This OTP will expire in 5 minutes.</p>
   </div>
   `
)
}

let verificationService=async (data)=>{
      let {otp,email}=data
  
        if(!otp || !email) throw new ApiError(400,"All fields are required")
       
      let partner=await PartnerOtpModel.findOne({otp})
  
      if(!partner) {
          throw new ApiError(401,"Invalid otp")
      }

      if(partner.email!==email) throw new ApiError(401,"Unauthorized partner")

        if (partner.otpExpires < Date.now()) {
        throw new ApiError(400, "OTP Expired");
       }

       let newPartner=await FoodPartnersModel.create({
          businessname:partner.businessname
          ,email:partner.email
          ,password:partner.password
          ,contactname:partner.contactname
          ,contact:partner.contact,
          address:partner.address
      })

     await PartnerOtpModel.deleteOne({ _id: partner._id });
  
      let accessToken=generateAccessToken(newPartner._id)
      let  refreshToken=generateRefreshToken(newPartner._id)
      
      newPartner.refreshToken=refreshToken
      await newPartner.save()

      return {accessToken,refreshToken,newPartner}
}

let loginService=async (data)=>{
 let {email,password}=data

    if(!email || !password) throw new ApiError(400,"All fields are required")

    let isExisted=await FoodPartnersModel.findOne({email})

    if(!isExisted){
        throw new ApiError(404,"Food Partner not found")
    }

    let comparePassword=await bcrypt.compare(password,isExisted.password)

    if(!comparePassword) throw new ApiError(401,"Invalid Credentials")

    let accessToken=generateAccessToken(isExisted._id)
    let refreshToken=generateRefreshToken(isExisted._id)
     
    isExisted.refreshToken=refreshToken
    await isExisted.save()

    return {accessToken,refreshToken,isExisted}

}

let getPartnerService=async (data)=>{
    
    let id=data

    if(!id) throw new ApiError(404,"Id not found")

    let partner=await FoodPartnersModel.findById(id).select("-password")

    if(!partner) throw new ApiError(404,"Partner not found")

    let foodByPartnerId=await foodModel.find({foodPartner:id})

    return {foodByPartnerId,partner}
}

module.exports={
    registerService,
    verificationService,
    loginService,
    getPartnerService
}