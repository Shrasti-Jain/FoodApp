const { default: mongoose } = require("mongoose");

let connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
        
    } catch (error) {
        console.log("Error in connecting db");
    }
}

module.exports=connectDb