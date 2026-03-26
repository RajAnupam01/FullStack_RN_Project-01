import {Router} from "express"
import { getMyProfile, updateMyProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

export const router = Router();

router.route("/me").get(verifyJWT,getMyProfile)
router.route("/update-me").patch(verifyJWT,upload.single('avatar'),updateMyProfile)