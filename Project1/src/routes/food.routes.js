let express=require('express')
const { createFoodController, allFoodController, getsinglefoodController, editsinglefoodController, deletefoodController, likeUnlikeController, userlikeController, removeFromCartController, removeController } = require('../controllers/food.controllers')
const foodPartnerMiddleware = require('../middlewares/foodPartner.middleware')
const upload = require('../config/multer')
const authMiddleware = require('../middlewares/auth.middleware')

let router=express.Router()

router.post('/',foodPartnerMiddleware,upload.single('video'),createFoodController)
router.get('/all',authMiddleware,allFoodController)
router.get('/getsinglefood/:id',foodPartnerMiddleware,getsinglefoodController)
router.get('/getsinglefoood/:id',authMiddleware,getsinglefoodController)
router.post('/editsinglefood/:id',foodPartnerMiddleware,editsinglefoodController)
router.get('/deletefood/:id',foodPartnerMiddleware,deletefoodController)
router.get('/like-unlike/:id',authMiddleware,likeUnlikeController)
router.get('/removecart/:id',authMiddleware,removeFromCartController)
router.get('/remove/:id',authMiddleware,removeController)

module.exports=router