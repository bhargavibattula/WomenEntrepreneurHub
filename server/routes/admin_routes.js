import { Router } from "express";
import { checkIsAdmin, verifyToken } from "../middlewares/verifyToken.js";
import { getAllUsers } from "../controllers/admin_controllers.js";
const adminRouter = Router();

adminRouter.get('/users' , verifyToken, checkIsAdmin, getAllUsers)

export default adminRouter;