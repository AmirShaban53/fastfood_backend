import { Router } from "express";
import users from "../Controller/users.js";
import checkAuth from "../Middleware/checkAuth.js";

const router = Router();

router.get('/orders', checkAuth(["admin", "user"]), users.getOrderHistory);
router.post('/orders', checkAuth(["admin", "user"]), users.addOrder);

export default router;