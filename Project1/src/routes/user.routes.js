let express=require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const { updatecontroller, updateProfileController, addItemController, orderController, collectionController, removeCollectionController } = require('../controllers/user.controllers')
const upload = require('../config/multer')
const { addtoCartController } = require('../controllers/food.controllers')

let router=express.Router()

router.post('/update-profile',updatecontroller)
router.post('/update-photo',upload.single('profile'),updateProfileController)
router.get('/addtocart/:id',addtoCartController)
router.get('/order',orderController)
router.post('/collection',collectionController)
router.get('/removeCollection/:id',removeCollectionController)

module.exports=router