import { Router } from "express";
import orders from "../Controller/orders.js";
import {checkAuth} from "../Middleware/checkAuth.js";


const router = Router();

router.get('/', checkAuth, orders.getOrderList);
router.get('/:id', checkAuth, orders.getOrder);
router.patch('/:id', checkAuth, orders.editOrder);

export default router;