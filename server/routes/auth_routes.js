import { Router } from "express";
import multer from "multer";
import { signup, verifyEmail ,GoogleAuth,  checkAuth , resetPassword , logout , forgotPassword , login, updateProfile } from "../controllers/auth_controllers.js";
import { forgotPasswordTemplate } from "../mailtrap/email.template.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router();

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'uploads/profiles/')
    } ,
    filename : (req , file , cb) => {
        const date = Date.now() ;
        const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'))

        cb(null ,`${req.userId}_${date}profile${fileExtension}` )
    }
})

const uploads = multer({storage});
router.post('/signup' , signup);
router.post('/verify-email' , verifyEmail);
router.post('/login' , login)
router.post('/logout' , logout)
router.post('/forgot-password' , forgotPassword)
router.post('/reset-password/:token' , resetPassword) ;
router.post('/googleAuth' , GoogleAuth) ;
router.get('/check-auth' , verifyToken, checkAuth )
router.post("/profile-setup",verifyToken , uploads.single("profileImage") , updateProfile)

export default router;