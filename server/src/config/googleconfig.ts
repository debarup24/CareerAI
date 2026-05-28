import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
  //as the redirect URI is set to "postmessage", Google doesn't redirect the page. Instead, it securely broadcasts a message containing a one-time authorization code directly to your frontend Javascript code via window.postMessage(). this code we will use in login controller 
);