import { Router } from "express";
import auth from '../controller/auth.js';

const router = Router();

router.post('/signup', auth.signUp);
router.post('/login', auth.login);

export default router;