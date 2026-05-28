import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  analyseResume,
  buildResume,
  generateInterview,
  jobMatcher,
} from "../controllers/ai.js";

const aiRouter = express.Router();

aiRouter.post("/analyse", isAuth, analyseResume);
aiRouter.post("/job-matcher", isAuth, jobMatcher);
aiRouter.post("/interview", isAuth, generateInterview);
aiRouter.post("/resume-build", isAuth, buildResume);

export default aiRouter;
