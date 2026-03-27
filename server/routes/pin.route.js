import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createPin, getAllPins, getCategoryPins, getCreatedPins, getOnePin, getSavedPins, toggleSavePin } from '../controllers/post.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

export const router = Router();

router.route("/all").get(verifyJWT,getAllPins);
router.route("/single/:id").get(verifyJWT,getOnePin)
router.route("/create").post(verifyJWT,upload.single('image'),createPin)
router.route("/category").get(verifyJWT,getCategoryPins)
router.route("/toggleSaveUnSavePin/:id").post(verifyJWT,toggleSavePin)
router.route("/getSaveUnSavePin").get(verifyJWT,getSavedPins)
router.route("/getCreatedPins").get(verifyJWT,getCreatedPins)