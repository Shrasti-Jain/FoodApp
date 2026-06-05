const foodModel = require("../models/food.model");
const FoodPartnersModel = require("../models/foodPartners.model");
const UserModel = require("../models/user.model");
const sentToImagekit = require("../services/storage.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createFoodController=asyncHandler(async (req,res)=>{
     
    let {name, description,category,price}=req.body

    if(!name || !category || !price) throw new ApiError(400,"All fields are required required")
  
    let video=req.file
 
    if(!video) throw new ApiError(400,"Video is required")

    let uploadedVideo=await sentToImagekit(video.buffer,video.originalname)
     
    let newFoodItem=await foodModel.create({
        name,
        description,
        video:uploadedVideo.url,
        foodPartner:req.foodPartner._id,
        category,
        price
    })

    return res.status(201).json(new ApiResponse("Food Item created successfully",newFoodItem))
})

const allFoodController=asyncHandler(async (req,res)=>{
      let all = await foodModel.aggregate([
    { $sample: { size: await foodModel.countDocuments() } }
  ]);

   await foodModel.populate(all, {
    path: "foodPartner",
    select: "businessname profile email",
  });

    
    return res.status(200).json(new ApiResponse("All food posts fetched",all))
})

const getsinglefoodController=asyncHandler(async(req,res)=>{

    let {id}=req.params

    if(!id) throw new ApiError(400,"Id is required")

    let food=await foodModel.findById(id).populate({
        path:"foodPartner",
        select:"businessname profile address"
    })

    if(!food) throw new ApiError(404,"Food not found")

    return res.status(200).json(new ApiResponse("Food details fetched",food))
})

const editsinglefoodController=asyncHandler(async(req,res)=>{
    let {name,description,category}=req.body

    if(!name || !category) throw new ApiError(400,"All fields are required")

    let {id}=req.params

    if(!id) throw new ApiError(400,"Id is required")

    let updatedFood=await foodModel.findByIdAndUpdate(id,{name,description,category},{new:true})

    return res.status(200).json(new ApiResponse("Food details updated",updatedFood))
})

const deletefoodController=asyncHandler(async(req,res)=>{
    let {id}=req.params

    if(!id) throw new ApiError(400,"Id is required")

    await foodModel.findByIdAndDelete(id)

    return res.status(200).json(new ApiResponse("Food deleted successfully"))
})

const likeUnlikeController=asyncHandler(async (req,res)=>{

    let {id}=req.params

    if(!id) throw new ApiError(404,"Id is required")

    let food=await foodModel.findById(id)

    if(!food) throw new ApiError(404,"Food not found")

    if(food.likes.includes(req.user._id)){
        food=await foodModel.findByIdAndUpdate(id,{
            $pull:{likes:req.user._id}
        },{
            new:true
        })
    }
    else {
        food=await foodModel.findByIdAndUpdate(id,{
            $push:{likes:req.user._id}
        },{
            new:true
        })
    }
    
    return res.status(200).json(new ApiResponse("Likes updated",food))
})

const addtoCartController=asyncHandler(async (req,res)=>{

    let {id}=req.params

    if(!id) throw new ApiError(400,"Id is required")
    
    let user=await UserModel.findById(req.user._id).select("-password")

    let existing=user.cartItems.find(item=>item.food.toString()===id)

    if(existing){
        existing.quantity++;
    }else{
        user.cartItems.push({
            food:id,
            quantity:1
        })
    }
    await user.save()

   await user.populate({
    path: "cartItems.food",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address"
    }
  });

     
    if(existing) return  res.status(200).json(new ApiResponse("Quantity updated",user))
                                                                                       
    return res.status(200).json(new ApiResponse("Food Item added to Cart",user))

})

const removeFromCartController=asyncHandler(async(req,res)=>{

    let {id}=req.params

    if(!id) throw new ApiError(400,"Id is required")
    
    let user=await UserModel.findById(req.user._id).populate({
    path: "cartItems.food",
    select: "foodPartner name video description category price",
    populate: {
      path: "foodPartner",
      select: "profile businessname address"
    }
  }).select("-password")

    console.log(user);
    
    let item=user.cartItems.find((e)=>e.food._id.toString()===id)
    
    if(item.quantity!=1){
        item.quantity--;
    }
    else{
       user=await UserModel.findByIdAndUpdate(req.user._id,{
        $pull:{
            cartItems:{
                food:id
            }
        }
       },{
        new:true
       })
    }
    

    await user.save()

    return res.status(200).json(new ApiResponse("Quantity decreased",user))

})

const removeController=asyncHandler(async(req,res)=>{
     let {id}=req.params

    if(!id) throw new ApiError(400,"Id is required")
    

  let user=await UserModel.findByIdAndUpdate(req.user._id,{
        $pull:{
            cartItems:{
                food:id
            }
        }
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

  return res.status(200).json(new ApiResponse("Item removed from cart",user))
})


module.exports={
    createFoodController,
    allFoodController,
    getsinglefoodController,
    editsinglefoodController,
    deletefoodController,
    likeUnlikeController,
    addtoCartController,
    removeFromCartController,
    removeController
}