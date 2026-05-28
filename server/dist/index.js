import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import aiRouter from "./routes/aiRoutes.js";
import Razorpay from "razorpay";
import paymentRouter from "./routes/paymentRoutes.js";
dotenv.config();
export const instance = new Razorpay({
    key_id: process.env.Razorpay_API_Key,
    key_secret: process.env.Razorpay_Secret,
});
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Hi, your API is working fine  ~ CareerAI");
});
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);
app.use("/api/payment", paymentRouter);
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
