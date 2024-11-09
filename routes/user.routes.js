import express from "express";

const router = express.Router();

import { getAllUsers, getUserByID, banUser, unbanUser, changeRole, refreshUserUnbanDate } from "../controller/user.controller.js";

router.get('/all', getAllUsers);
router.get('/', getUserByID);

router.put('/ban', banUser);
router.put('/unban', unbanUser);
router.put('/change-role', changeRole);
router.put('/refresh-date/:userID', refreshUserUnbanDate);

export default router;