import express from 'express'
import { addToCart,removeFromCart,fetchCart } from '../controllers/cartController.js'
const cartRouter = express.Router();

cartRouter.post("/add",addToCart)
cartRouter.post("/remove",removeFromCart)
cartRouter.post("/get",fetchCart)

export default cartRouter;