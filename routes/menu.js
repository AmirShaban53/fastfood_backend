import { Router } from "express";
import {checkAuth} from "../Middleware/checkAuth.js";
import menu from '../Controller/menu.js';

const router = Router();

router.get('/', menu.getFoodList);
router.post('/', checkAuth, menu.addFood);
router.patch('/:id', menu.editFood);
router.delete('/:id', checkAuth, menu.deleteFood);

export default router;


