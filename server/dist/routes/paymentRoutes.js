import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { checkOut, paymentVerification } from "../controllers/payment.js";
const paymentRouter = express.Router();
paymentRouter.post("/checkout", isAuth, checkOut);
paymentRouter.post("/verify", isAuth, paymentVerification);
export default paymentRouter;
