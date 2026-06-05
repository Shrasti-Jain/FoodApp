const { default: mongoose } = require("mongoose");

let foodSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  video:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  category:{
     type:String,
     required:true
  },
  foodPartner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"foodPartners"
  },
  price:{
    type:Number,
    required:true
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }]
},{
    timestamps:true
})

let foodModel=mongoose.model("foods",foodSchema)

module.exports=foodModel