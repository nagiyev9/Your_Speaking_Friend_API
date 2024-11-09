import express from "express";

const router = express.Router();

import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import topicRouter from "./topic.routes.js";
import questionRouter from "./question.routes.js";
import phrasalVerbRouter from "./phrasal-verb.routes.js";
import formRouter from "./form.routes.js";

import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/checkAdmin.js";


router.use('/auth', authRouter);
router.use('/form', [protectRoute], formRouter);
router.use('/user', [protectRoute, isAdmin], userRouter);
router.use('/topic', [protectRoute, isAdmin], topicRouter);
router.use('/question', [protectRoute, isAdmin], questionRouter);
router.use('/phrasal-verb', [protectRoute, isAdmin], phrasalVerbRouter);

export default router;