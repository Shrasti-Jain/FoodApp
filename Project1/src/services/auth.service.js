const OtpModel = require("../models/otp.model");
const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const sentMail = require("./mail.service");
let jwt=require('jsonwebtoken')

let registerService=async (data)=>{
     let {firstname,lastname, email, password,provider}=data

    if(!firstname || !lastname || !email || !password ){
        throw new ApiError(400,"All fields are required")
    }

    let isExisted=await UserModel.findOne({
        email
    })

    if(isExisted){
        throw new ApiError(409,"User already registered");       
    }
  
    let otp = Math.floor(100000 + Math.random() * 900000)

    await OtpModel.create({
        otpString:otp,
        email,
       otpExpires:Date.now()+5*60*1000,
       firstname,
       lastname,
       provider:provider || "local",
       password
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

let loginService=async(data)=>{
    let {email,password}=data

    if(!email || !password){
        throw new ApiError(400,"All fields are required");
    }

    let isExisted=await UserModel.findOne({email})

    if(!isExisted){
        throw new ApiError(404,"User not found")
    }

    if(isExisted.provider!="local") throw new ApiError(400,"Login with Google")

    let decode=await isExisted.comparePassword(password)

    if(!decode){
        throw new ApiError(401,"Invalid Credentials")
    }

    let accessToken=generateAccessToken(isExisted._id)
    let refreshToken=generateRefreshToken(isExisted._id)
    
    isExisted.refreshToken=refreshToken
    await isExisted.save()

    return {isExisted,accessToken,refreshToken}
}

let otpService=async (data)=>{
      let {otp,email}=data

    if(!otp || !email) throw new ApiError(404,"All fields are required")

    let otpdata=await OtpModel.findOne({
        otpString:otp
    })

    if(!otpdata) throw new ApiError(401,"Invalid OTP")

    if(otpdata.email!==email) throw new ApiError(401,"Unauthorized User")
        if(otpdata.otpExpires<Date.now()) throw new ApiError(400,"Otp Expired")
     
        let newUser=await UserModel.create({
        firstname:otpdata.firstname,
        lastname:otpdata.lastname,
        email:otpdata.email,
        password:otpdata.password,
        provider:otpdata.provider
    })

    await OtpModel.deleteOne({ _id: otpdata._id });

    let accessToken=generateAccessToken(newUser._id)
    let refreshToken=generateRefreshToken(newUser._id)

    newUser.refreshToken=refreshToken
    await newUser.save()

    return {newUser,accessToken,refreshToken}
}

let getAccessService=async (refreshToken)=>{

    if(!refreshToken) throw new ApiError(404,"Refresh token not found ")
     console.log(refreshToken);
     
    let decode=jwt.verify(refreshToken,process.env.REFRESH_SECRET_KEY)

    if(!decode) throw new ApiError(401,"Unauthorized User")

    let user=await UserModel.findById(decode.id)

    if(!user) throw new ApiError(404,"User not found")
    console.log(user.refreshToken);
    
    if(refreshToken!=user.refreshToken) throw new ApiError(401,"Unauthorized request")

    let accessToken=generateAccessToken(decode.id)

    return accessToken
}

module.exports={
    registerService,
    loginService,
    otpService,
    getAccessService
}