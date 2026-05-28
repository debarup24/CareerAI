import { oauth2client } from "../config/googleconfig.js";
import TryCatch from "../middlewares/trycatch.js";
import { User } from "../models/userModel.js";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
export const loginUser = TryCatch(async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({
            message: "Authorization code is required",
        });
    }
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    //   const userRes = await axios.get(
    //     `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    //   );
    //  INSTEAD OF AXIOS: Use the built-in oauth2 provider from the google toolkit
    const oauth2 = google.oauth2({
        auth: oauth2client,
        version: 'v2'
    });
    const userRes = await oauth2.userinfo.get();
    const { email, name, picture } = userRes.data;
    if (!email || !name) {
        return res.status(400).json({
            message: "Could not retrieve data from Google account.",
        });
    }
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            name,
            email,
            image: picture || "",
        });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
        expiresIn: "15d",
    });
    res.status(200).json({
        success: true,
        message: "User Successfully Logged in",
        token,
        user,
    });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.json(user);
});
