import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createPin, editPin, getAllPins, getCategoryPins, getCreatedPins, getOnePin, getSavedPins, removePin, toggleFollow, toggleLikePin, toggleSavePin } from '../controllers/post.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

export const router = Router();

router.route("/all").get(verifyJWT,getAllPins);
router.route("/single/:id").get(verifyJWT,getOnePin)
router.route("/create").post(verifyJWT,upload.single('image'),createPin)
router.route("/category").get(verifyJWT,getCategoryPins)
router.route("/toggleSaveUnSavePin/:id").post(verifyJWT,toggleSavePin)
router.route("/getSaveUnSavePin").get(verifyJWT,getSavedPins)
router.route("/getCreatedPins").get(verifyJWT,getCreatedPins)
router.route("/toggleLikeUnLikePin/:id").post(verifyJWT,toggleLikePin)
router.route("/toggleFollow/:id").post(verifyJWT,toggleFollow)
router.route("/edit/:id").patch(verifyJWT,editPin)
router.route("/remove/:id").delete(verifyJWT,removePin)