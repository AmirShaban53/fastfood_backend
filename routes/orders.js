import { Router } from "express";
import orders from "../Controller/orders.js";
import checkAuth from "../Middleware/checkAuth.js";


const router = Router();

router.get('/', checkAuth(["admin", "user"]),  orders.getOrderList);
router.get('/:id', checkAuth(["admin"]), orders.getOrder);
router.patch('/:id', checkAuth(["admin"]), orders.editOrder);

export default router;