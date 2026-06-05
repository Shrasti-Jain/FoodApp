const { default: mongoose } = require("mongoose");
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')

let userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
         type:String,
         required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6,
        required:function(){
            return this.provider==="local"
        }
    },
    provider:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    profile:{
       type:String
    },
    refreshToken:{
        type:String
    },
    cartItems:[{
        food:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"foods"
        },
        quantity:{
            type:String,
            default:1
        }
    }],
    resetToken:{
        type:String
    },
    collection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods"
    }]
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.password) return;
    if(!this.isModified("password"))
        return;
    this.password=await bcrypt.hash(this.password,10)
})



userSchema.methods.comparePassword=async function(password){
  if(!this.password) return false
  let decode=await bcrypt.compare(password,this.password)
  return decode 
}

let UserModel=mongoose.model("users",userSchema)

module.exports=UserModel