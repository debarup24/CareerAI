import mongoose from "mongoose";
const connectDB = async (retries = 5, delay = 2000) => {
    // max try 5 attempts delay 2 sec
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "CareerAI",
        });
        console.log("✅ DB successfully connected");
    }
    catch (error) {
        console.error("❌ DB connection failed");
        if (retries === 0) {
            console.error("❌ All retries failed. Exiting...");
            process.exit(1);
        }
        console.log(`🔁 Retrying in ${delay / 1000}s...`);
        await new Promise((res) => setTimeout(res, delay));
        return connectDB(retries - 1, delay * 2); // exponential backoff : recursive
    }
};
export default connectDB;
