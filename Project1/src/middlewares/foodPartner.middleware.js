const FoodPartnersModel = require("../models/foodPartners.model");
const ApiError = require("../utils/apiError");
let jwt=require('jsonwebtoken')

let foodPartnerMiddleware=async (req,res,next)=>{
    try {

      let accessToken=req.cookies.accessToken

      if(!accessToken){
        throw new ApiError(401,"Access token not found")
      }

      let decode=jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY)

      if(!decode){
        throw new ApiError(401,"Unauthorized token")
      }

      let foodPartner=await FoodPartnersModel.findById(decode.id)

      if(!foodPartner) 
        throw new ApiError(404,"Food Partner not found")
      
      let safePartner=foodPartner.toObject()
      delete safePartner.password

      req.foodPartner=safePartner

      next()

    } catch (error) {
        throw new ApiError(500,error.message);
    }
}

module.exports=foodPartnerMiddleware
