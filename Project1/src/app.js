require('dotenv').config()
let express=require('express')
const connectDb = require('./config/db')
const errorMiddleware = require('./middlewares/errorMiddleware')
let authRoutes=require('./routes/auth.routes')
let foodRoutes=require('./routes/food.routes')
let foodPartnerRoutes=require('./routes/foodPartner.routes')
let cookieParser=require('cookie-parser')
let passport=require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
let app=express()
let cors=require('cors')
const UserModel = require('./models/user.model')
const authMiddleware = require('./middlewares/auth.middleware')
const ApiError = require('./utils/apiError')
let jwt=require('jsonwebtoken')
const ApiResponse = require('./utils/apiResponse')
const foodPartnerMiddleware = require('./middlewares/foodPartner.middleware')
const userRoutes=require('./routes/user.routes')

connectDb()
app.use(cookieParser())

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

app.use(express.json())
app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
},

async (accessToken,refreshToken,profile,cb)=>{
  let email=profile.emails[0].value
  let name=profile.name.givenName
  
  let isExisted=await UserModel.findOne({email})

  if(isExisted) return cb(null, isExisted)

  let newUser=await UserModel.create({
     firstname:name,
     lastname:profile.name.familyName,
     provider:profile.provider,
     email,
     profile:profile.photos[0].value
  })

  return cb(null,newUser)
}))
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
app.use('/api/foodPartner',foodPartnerRoutes)
app.use('/api/user',authMiddleware,userRoutes)
app.get('/me',authMiddleware,async (req,res)=>{
     try {
       let accessToken=req.cookies.accessToken

      if(!accessToken){ 
        
        throw new ApiError(401,"Access token not found")}

      let decode=jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY)

      if(!decode) throw new ApiError(401,"Unauthorized token")

      const user = await UserModel.findById(req.user._id).populate({
      path: "cartItems.food",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address"
    }
  })  .populate({
    path: "collection",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address"
    }
  });
        
      return res.status(200).json(new ApiResponse("Logged in User",user))
     } catch (error) {
      
        throw new ApiError(500,error.message)
     }
})

app.get('/partner',foodPartnerMiddleware,(req,res)=>{
     try {
       let {accessToken}=req.cookies
       
      if(!accessToken) throw new ApiError(401,"Access token not found")

      let decode=jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY)

      if(!decode) throw new ApiError(401,"Unauthorized token")

      return res.status(200).json(new ApiResponse("Logged in partner",req.foodPartner))
     } catch (error) {
      
        throw new ApiError(500,error.message)
     }
})


app.use(errorMiddleware)

module.exports=app