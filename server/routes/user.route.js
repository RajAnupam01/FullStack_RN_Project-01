import {Router} from "express"
import { getMyProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const router = Router();

router.route("/me").get(verifyJWT,getMyProfile)