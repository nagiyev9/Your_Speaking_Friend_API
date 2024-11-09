import express from "express";

const router = express.Router();

import { getAllAccounts, getAccount, signup, confirmAccount, login, closeAccount, confirmCloseAccount, forgotPassword, resetPassword, changeRole } from "../controller/auth.controller.js";
import { validate_register, validate_reset_password, validate_login, validate_confirmCode, handle_validation_errors } from "../middleware/validations/validation.js";
import { limiter } from "../middleware/limiter.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { isAdmin } from "../middleware/checkAdmin.js";

router.get('/account/all', [protectRoute, isAdmin], getAllAccounts);
router.get('/account', [protectRoute, isAdmin], getAccount);

router.post('/signup', [validate_register, handle_validation_errors], signup); // Signup
router.post('/signup/confirm', limiter, confirmAccount); // Confirm signup

router.post('/login', [validate_login], login); // Login

router.post('/close-account', protectRoute, closeAccount); // Close Account
router.post('/close-account/confirm', [protectRoute, limiter], confirmCloseAccount); // Confirm close account

router.post('/forgot-password', validate_confirmCode, forgotPassword); // Forgot password
router.post('/reset-password', [validate_reset_password, handle_validation_errors], resetPassword); // Reset password

router.put('/account/change-role', [protectRoute, isAdmin], changeRole);

export default router;