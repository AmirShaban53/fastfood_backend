import { Router } from "express";
import checkAuth from "../Middleware/checkAuth.js";
import imageUpload from "../Middleware/imageUpload.js";
import menu from '../Controller/menu.js';


const router = Router();

router.get('/', menu.getFoodList);
router.post('/', checkAuth(["admin"]), imageUpload.single('image'), menu.addFood);
router.patch('/:id', checkAuth(["admin"]), imageUpload.single('image'), menu.editFood);
router.delete('/:id', checkAuth(["admin"]), menu.deleteFood);

export default router;


