import {Router} from 'express'
import { LoginController, LogoutController, RegisterController } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'


export const router = Router()

router.route("/register").post(RegisterController)
router.route("/login").post(LoginController)
router.route("/logout").post(verifyJWT,LogoutController)