import {Router} from 'express'
import { LoginController, RegisterController } from '../controllers/auth.controller.js'

export const router = Router()

router.route("/register").post(RegisterController)
router.route("/login").post(LoginController)