import { Router } from "express";
import checkAuth from "../middleware/checkAuth.js";
import imageUpload from "../middleware/imageUpload.js";
import menu from '../controller/menu.js';


const router = Router();

router.get('/', menu.getFoodList);
router.post('/', checkAuth(["admin"]), /*imageUpload.single('image'),*/ menu.addFood);
router.patch('/:id', checkAuth(["admin"]), menu.editFood);
router.delete('/:id', checkAuth(["admin"]), menu.deleteFood);

export default router;


