import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { addComment, getComments } from '../controllers/comment.controller.js'

export const router = Router()

router.route("/addComment/:id").post(verifyJWT,addComment);
router.route("/getComment/:id").get(verifyJWT,getComments);