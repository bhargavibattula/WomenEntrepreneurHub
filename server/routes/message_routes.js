import {Router} from "express"
import {verifyToken} from "../middlewares/verifyToken.js"
import { getAllCommunityMessages } from "../controllers/message_controllers.js";

const router = Router();

router.get("/get-community-messages", verifyToken , getAllCommunityMessages)

export default router;