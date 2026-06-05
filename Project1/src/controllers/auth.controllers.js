const OtpModel = require("../models/otp.model");
const UserModel = require("../models/user.model");
const { registerService, loginService, otpService, getAccessService } = require("../services/auth.service");
const sentMail = require("../services/mail.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { generateAccessToken } = require("../utils/generateToken");
let jwt=require('jsonwebtoken')
let bcrypt=require('bcrypt')

let registerController=asyncHandler(async (req,res)=>{
   await registerService(req.body)
   
  return res.status(200).json(new ApiResponse("Mail sent successfully"))
  
})

let loginController=asyncHandler(async(req,res)=>{

    let {isExisted,accessToken,refreshToken}=await loginService(req.body)

     res.cookie("accessToken",accessToken,{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:15*60*1000
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:24*60*60*1000
    })

     let safeUser=isExisted.toObject()
     delete safeUser.password

    return res.status(200).json(new ApiResponse("User logged in successfully",safeUser))
})

let otpCheckController=asyncHandler(async(req,res)=>{
   let {newUser,accessToken ,refreshToken}=await otpService(req.body)

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:15*60*1000
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:24*60*60*1000
    })

    let userObj = newUser.toObject()
    delete userObj.password

    return res.status(200).json(new ApiResponse("Otp verified sucessfully",userObj))
})

let getAccessController=asyncHandler(async(req,res)=>{
    let accessToken=await getAccessService(req.cookies.refreshToken)

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        sameSite:"none",
        secure:true,
        maxAge:15*60*1000
    })

    return res.status(200).json(new ApiResponse("Access Token generated"))
}) 

let logoutController=asyncHandler((req,res)=>{
   res.clearCookie("accessToken",{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:15*60*1000
    })

    res.clearCookie("refreshToken",{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:24*60*60*1000
    })

    return res.status(200).json(new ApiResponse("User logout Successfully...See you soon👋"))
})

let forgetController=asyncHandler(async(req,res)=>{
    let {email}=req.body

    if(!email) throw new ApiError(400,"Email is required")
    
    let isExisted=await UserModel.findOne({email})

    if(!isExisted) throw new ApiError(404,"User not found")
    
    if(isExisted.provider!="local") throw new ApiError(400,"Login with Google")

    let token=generateAccessToken(isExisted._id)
    
    isExisted.resetToken=token
    await isExisted.save()

    let resetLink = `http://localhost:5173/reset/${token}`;

const html = `
<div style="background:#0f0f0f;padding:40px 20px;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:auto;background:#181818;border-radius:16px;padding:40px;border:1px solid #2a2a2a;">

    <h1 style="color:#ffffff;text-align:center;margin-bottom:10px;">
      Reset Your Password
    </h1>

    <p style="color:#b3b3b3;font-size:16px;line-height:1.6;">
      Hello,
    </p>

    <p style="color:#b3b3b3;font-size:16px;line-height:1.6;">
      We received a request to reset your password. Click the button below to create a new password.
    </p>

    <div style="text-align:center;margin:35px 0;">
      <a
        href="${resetLink}"
        style="
          background:#f97316;
          color:white;
          text-decoration:none;
          padding:14px 30px;
          border-radius:10px;
          font-size:16px;
          font-weight:bold;
          display:inline-block;
        "
      >
        Reset Password
      </a>
    </div>

    <p style="color:#b3b3b3;font-size:15px;line-height:1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>

    <p style="word-break:break-all;color:#f97316;">
      ${resetLink}
    </p>

    <hr style="border:none;border-top:1px solid #2a2a2a;margin:30px 0;" />

    <p style="color:#888;font-size:14px;line-height:1.6;">
      This password reset link will expire shortly for security reasons.
    </p>

    <p style="color:#888;font-size:14px;line-height:1.6;">
      If you didn't request a password reset, you can safely ignore this email.
    </p>

    <p style="color:#666;font-size:13px;text-align:center;margin-top:30px;">
      © 2026 FoodReels. All rights reserved.
    </p>

  </div>
</div>
`;

await sentMail(email,"Reset Password",html)

return res.status(200).json(new ApiResponse("Mail sent successfully"))
})

let resetController=asyncHandler(async(req,res)=>{

    let {token}=req.params
    
    if(!token) throw new ApiError(401,"Token is required")

    let {password,confirmPassword}=req.body

    if(!password || !confirmPassword) throw new ApiError(400,"All fields are required")

    let decode=await jwt.verify(token,process.env.ACCESS_SECRET_KEY)

    if(!decode) throw new ApiError(401,"Unauthorized access")

    let user=await UserModel.findById(decode.id)

    if(!user.resetToken) throw new ApiError(401,"Link Expired") 

    if(password!==confirmPassword) throw new ApiError(401,"Password mismatching")

    let hashPassword=await bcrypt.hash(password,10)

    let updatedUser=await UserModel.findByIdAndUpdate(decode.id,{
      password:hashPassword,
    },{
      new:true
    })
    
    updatedUser.resetToken=null
    await updatedUser.save()

    return res.status(200).json(new ApiResponse("Password reset successfully"))
    
})

let resendOtpController=asyncHandler(async(req,res)=>{
   let {email}=req.body

   if(!email) throw new ApiError(400,"Email is required")

   let otp = Math.floor(100000 + Math.random() * 900000)

   let updated=await OtpModel.findOneAndUpdate({email},{
    otpString:otp,
    otpExpires:Date.now()+5*60*1000,
   },{new:true})
    
   if(!updated)
    throw new ApiError(404,"Registration session expired. Please register again.");


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
       `)

      return res.status(200).json(new ApiResponse("Mail sent successfully"))

})

module.exports={
    registerController,
    loginController,
    otpCheckController,
    getAccessController,
    logoutController,
    forgetController,
    resetController,
    resendOtpController
}