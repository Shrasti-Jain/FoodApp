let multer=require('multer')

let storage=multer.memoryStorage()

let upload=multer(
    {
        storage,
        limits: {
           fileSize: 30 * 1024 * 1024 
        }
    }
)

module.exports=upload
