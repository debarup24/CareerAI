import express from "express";
import { loginUser, myProfile } from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
const userRouter = express.Router();
userRouter.post('/login', loginUser);
userRouter.get('/me', isAuth, myProfile);
export default userRouter;
