
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartItems.js";
import express from "express";

const cartRouter = express.Router();

cartRouter.post('/upload', authUser, updateCart)

export default cartRouter ;

