let express=require('express')
const { registerController, loginController, otpCheckController, getAccessController, logoutController, forgetController, resetController, resendOtpController } = require('../controllers/auth.controllers')
const passport = require('passport')
let jwt=require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const authMiddleware = require('../middlewares/auth.middleware')
const UserModel = require('../models/user.model')

let router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/otp',otpCheckController)
router.get('/get-accessToken',getAccessController)
router.get('/logout',authMiddleware,logoutController)
router.post('/forget',forgetController)
router.post('/reset/:token',resetController)
router.post('/resendOtp',resendOtpController)

router.get('/google',passport.authenticate("google",{
    scope:["profile","email"],
    session:false
}))

router.get('/google/callback',passport.authenticate("google",{failureRedirect:process.env.CORS_ORIGIN,session:false}),async(req,res)=>{
    let token=jwt.sign({id:req.user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
    
    let accessToken=generateAccessToken(req.user._id)

    let refreshToken=generateRefreshToken(req.user._id)

     res.cookie("accessToken",accessToken,{
        httpOnly:true,
        sameSite:'none',
        secure:false,
        maxAge:15*60*1000
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        sameSite:'none',
        secure:false,
        maxAge:24*60*60*1000
    })

     let user=await UserModel.findById(req.user._id)
     
     user.refreshToken=refreshToken
     await user.save()

    return res.redirect(process.env.REDIRECT_URL)
})

module.exports=router