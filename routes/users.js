import { Router } from "express";
import users from "../Controller/users.js";
import {checkAuth} from "../Middleware/checkAuth.js";


const router = Router();

router.get('/orders', checkAuth, users.getOrderHistory);
router.post('/orders', checkAuth,  users.addOrder);


export default router;