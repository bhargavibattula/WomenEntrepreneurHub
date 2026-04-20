import {Router} from "express" ;
import multer from "multer"
import { applyToJob, createJob, getAllJobs, getAllJobsThatUserApplied, getApplicationsForJob, getJobById, updateStatus,searchJob ,
    getJobByUserId,getJobByLoc, updateJob, deleteJobById
} from "../controllers/job_controllers.js";
import { checkIsAdminOrEnt, verifyToken } from "../middlewares/verifyToken.js";

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'uploads/resume/')
    } ,
    filename : (req , file , cb) => {
        const date = Date.now() ;
        const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'))

        cb(null ,`${req.userId}_${date}_resume${fileExtension}` )
    }
})
const router = Router();
const uploads  = multer({storage})

router.post('/create-job',verifyToken , checkIsAdminOrEnt,createJob)
router.get('/get-jobs' , getAllJobs)

router.get('/search' , searchJob)
router.get('/get-job/:id',verifyToken,getJobById)
router.get('/get-jobs-by-user-id',verifyToken,getJobByUserId)
router.post('/:id/apply' , verifyToken , uploads.single('resume') , applyToJob )
router.get('/applications' , verifyToken ,getAllJobsThatUserApplied )
router.get('/applications/:id' , verifyToken ,getApplicationsForJob )
router.get('/get-jobs/:district' , verifyToken ,getJobByLoc)
router.patch('/update-job/:id', verifyToken, updateJob)
router.delete('/delete-job/:id', verifyToken, deleteJobById)
router.put('/applications/:applicationId' , verifyToken, updateStatus)
export default router;