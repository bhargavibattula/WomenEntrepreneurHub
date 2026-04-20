import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createResource, getAllResources, getResourceById,updateResourceById,deleteBusinessById,searchResource,
    getResourceByCategory , getResourcesByUserId
 } from "../controllers/resource_controller.js";





const router = Router();

router.post('/create-resource',verifyToken,createResource)
router.get(`/get-resources-by-user-id` , verifyToken ,getResourcesByUserId)
router.get('/',getAllResources)
router.get('/search',searchResource)
router.get('/:id',getResourceById)
router.get('/category/:category',verifyToken,getResourceByCategory)
router.patch('/:id',verifyToken,updateResourceById)
router.delete('/:id',verifyToken,deleteBusinessById)

export default router