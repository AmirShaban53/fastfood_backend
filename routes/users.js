import { Router } from "express";
import users from "../controller/users.js";
import checkAuth from "../middleware/checkAuth.js";


const router = Router();

router.get('/orders', checkAuth(["admin", "user"]), users.getOrderHistory);
router.post('/orders', checkAuth(["admin", "user"]), users.addOrder);


export default router;