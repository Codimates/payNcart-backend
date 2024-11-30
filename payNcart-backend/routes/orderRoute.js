import express from "express"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",userOrders);
orderRouter.post("/list",listOrders);
orderRouter.post("/status",updateStatus);


export default orderRouter;