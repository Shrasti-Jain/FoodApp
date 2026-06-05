const { default: mongoose, mongo } = require("mongoose");
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')

let foodPartnersSchema=new mongoose.Schema({
    businessname:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        maxlength:10,
        minlength:10,
        required:true
    },
    address:{
        type:String
    },
    contactname:{
         type:String,
        required:true
    },
    refreshToken:{
        type:String
    },
    profile:{
        type:String
    }
},
{
     timestamps:true
})



let FoodPartnersModel=mongoose.model("foodPartners",foodPartnersSchema)

module.exports=FoodPartnersModel