import { Router } from "express";
import multer from "multer"
import { verifyToken } from "../middlewares/verifyToken.js";
import {  createBusiness,
     getAllBusinesses,
      getBusinessById,
      updateBusinessById,
      deleteBusinessById,
      searchBusinesses,
      getReviewsById,
      addReviewsById,
      editReviewsById,
      deleteReviewsById,
      getBusinessByUserId
} from "../controllers/business_controller.js";
const router = Router();

const storage = multer.diskStorage({
      destination : (req , file , cb) => {
          cb(null , 'uploads/business/')
      } ,
      filename : (req , file , cb) => {
          const date = Date.now() ;
          const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'))
  
          cb(null ,`${req.userId}_${date}business${fileExtension}` )
      }
  })

  const uploads = multer({storage})

router.post('/create-business',verifyToken,uploads.single("logoImage"),createBusiness)
router.get('/get-all-business',getAllBusinesses)
router.get('/getBusiness/:id',verifyToken,getBusinessById)
router.get('/getBusinessByUserId',verifyToken,getBusinessByUserId)
router.patch('/updateBusiness/:id',verifyToken,updateBusinessById)
router.delete('/deleteBusiness/:id',verifyToken,deleteBusinessById)
router.get('/search',verifyToken, searchBusinesses);
router.get('/getReviewsById/:id',verifyToken, getReviewsById);
router.post('/addReview/:id',verifyToken,addReviewsById);
router.patch('/editReview/:reviewid',verifyToken,editReviewsById);
router.delete('/deleteReview/:reviewid',verifyToken,deleteReviewsById);
router.get('/get-businesses-by-user-id',verifyToken,getBusinessByUserId)

export default router