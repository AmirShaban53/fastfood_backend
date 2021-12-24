import { Router } from "express";
import checkAuth from "../Middleware/checkAuth.js";
import {imageUploads, dataUri} from '../Middleware/imageUpload.js';
import menu from '../Controller/menu.js';

import { uploader } from "../config/cloudinaryConfig.js";
import logger from "../Middleware/logger.js";

const router = Router();

router.get('/', menu.getFoodList);
router.post('/', checkAuth(["admin"]), imageUploads, menu.addFood);
router.patch('/:id', checkAuth(["admin"]), imageUploads, menu.editFood);
router.delete('/:id', checkAuth(["admin"]), menu.deleteFood);

export default router;


