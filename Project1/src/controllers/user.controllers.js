const UserModel = require("../models/user.model");
const sentToImagekit = require("../services/storage.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let updatecontroller=asyncHandler(async(req,res)=>{
      let {firstname,lastname}=req.body

      if(!firstname || !lastname) return new ApiError(404,"All fields are required")
      
      let updatedUser=await UserModel.findByIdAndUpdate(req.user._id,{firstname,lastname},{new:true}).select("-password")

      return res.status(200).json(new ApiResponse("User updated successfully",updatedUser))
})

let updateProfileController=asyncHandler(async(req,res)=>{
     let profile=req.file

     let uploadedImage=await sentToImagekit(profile.buffer,profile.originalname)
     
     let updatedUser=await UserModel.findByIdAndUpdate(req.user._id,{profile:uploadedImage.url},
        {new:true}).select("-password")

     return res.status(200).json(new ApiResponse("Profile photo updated",updatedUser))
     
})

let orderController=asyncHandler(async(req,res)=>{
    let user=await UserModel.findByIdAndUpdate(req.user._id,{
        cartItems:[]
    },{
   new:true
    }).populate({
    path: "cartItems.food",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address"
    }
  }).select("-password")


  return res.status(200).json(new ApiResponse("Order Placed successfully🎉",user))

})

let collectionController=asyncHandler(async(req,res)=>{
    let {foodId}=req.body
    
    if(!foodId) throw new ApiError(404,"Id is required")
    
    let user=await UserModel.findById(req.user._id)

    if(!user.collection.includes(foodId)){
       user= await UserModel.findByIdAndUpdate(req.user._id,{
           $push:{
            collection:foodId
           }},{new:true})
          }
    else throw new ApiError(409,"Already in collection")

   user = await user.populate([
  {
    path: "cartItems.food",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address",
    },
  },
  {
    path: "collection",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address",
    },
  },
]);

    return res.status(200).json(new ApiResponse("Item added to the collection",user))
  
})

let removeCollectionController=asyncHandler(async(req,res)=>{
  let {id}=req.params

  if(!id) throw new ApiError(400,"Id is required")

  let user=await UserModel.findById(req.user._id)

 if(!user) throw new ApiError(404,"User not found")

 if(user.collection.includes(id)){
  user=await UserModel.findByIdAndUpdate(req.user._id,{
    $pull:{collection:id}
  },{new:true}).populate([
  {
    path: "cartItems.food",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address",
    },
  },
  {
    path: "collection",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address",
    },
  },
]);
 }
  
 return res.status(200).json(new ApiResponse("Food Item deleted successfully",user))

})


module.exports={
    updatecontroller,
    updateProfileController,
    orderController,
    collectionController,
    collectionController,
    removeCollectionController
}