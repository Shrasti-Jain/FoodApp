let errorMiddleware=(err,req,res,next)=>{
   console.log(err);
   
   console.log(err.statusCode);
   
   return res.status(err.statusCode || 500).json({
    success:false,
    message:err.message
   })
}

module.exports=errorMiddleware