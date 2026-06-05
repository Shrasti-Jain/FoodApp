let express=require('express')
const { loginPartnerController, registerPartnerController, verificationOtpController, getPartnerByIdController, logoutController, updatePhotoController, updateProfileController, forgetPartnerController, resetPartnerController, resendOtpController, getPartnerAccessController, allPartnersController } = require('../controllers/foodPartners.controllers')
const authMiddleware = require('../middlewares/auth.middleware')
const foodPartnerMiddleware = require('../middlewares/foodPartner.middleware')
const upload = require('../config/multer')

let router=express.Router()

router.post('/register',registerPartnerController)
router.post('/login',loginPartnerController)
router.post('/otp',verificationOtpController)
router.get('/logout',foodPartnerMiddleware,logoutController)
router.get('/foodpartner/:id',authMiddleware,getPartnerByIdController)
router.post('/update-photo',foodPartnerMiddleware,upload.single("profile"),updatePhotoController)
router.post('/update-profile',foodPartnerMiddleware,updateProfileController)
router.get('/food-partner/:id',foodPartnerMiddleware,getPartnerByIdController)
router.post('/forgetpartner',forgetPartnerController)
router.post('/resetPartner/:token',resetPartnerController)
router.post('/resendOtp',resendOtpController)
router.get('/get-accessPartnerToken',getPartnerAccessController)
router.get('/all',authMiddleware,allPartnersController)

module.exports=router