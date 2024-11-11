import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import authService from "../service/auth.service.js";
import { transporter } from "../utils/sendMail.js";
import { generateConfirmCode, generateInfoID } from "../utils/generate-code.js";
import { signupMessage } from "../utils/messages/signup-message.js";
import { isNotExist, resetPasswordMessage } from "../utils/messages/forgot-password.js";
import { closeAccountMessage } from "../utils/messages/close-account-message.js";
import { logger } from "../middleware/log/logger.js";

// Get all accounts
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await authService.getAllUsers();
        res.status(200).json({
            status: 200,
            data: accounts
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Get one account
export const getAccount = async (req, res) => {
    try {
        const { infoID } = req.query;

        if (!infoID) {
            return res.status(400).json({ message: "Id could not found" });
        };

        const account = await authService.getUserByInfoID(infoID);
        res.status(200).json({
            status: 200,
            data: account
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Signup
export const signup = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        const checkExist = await authService.getUserByEmail(email);

        if (checkExist) {
            return res.status(400).json({ error: "This email already registered" });
        };

        const confirmCode = generateConfirmCode();

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Account Conformation',
            html: signupMessage(name, surname, confirmCode)
        });

        const unConfirmedUser = { name, surname, email, password };

        res.status(200).json({
            status: 200,
            message: 'Confirmation code has been sent your email!',
            unConfirmedUser: unConfirmedUser,
            confirmCode: confirmCode
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Confirm user account
export const confirmAccount = async (req, res) => {
    try {
        const { confirmationCode, name, surname, email, password } = req.body;
        console.log(req.body);

        if (!confirmationCode) {
            return res.status(400).json({ error: confirmationCode === undefined ? "Please write confirmation code!" : "Confirmation code failed!" });
        };

        const unConfirmedUser = { name, surname, email, password };

        if (!unConfirmedUser) {
            return res.status(404).json({ error: "No Data!" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await authService.createNewAccount({
            name,
            surname,
            email,
            password: hashedPassword,
            infoID: generateInfoID()
        });

        await req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
        });

        res.status(201).json({
            status: 201,
            message: "Account created",
            data: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const isExist = await authService.getUserByEmail(email);

        if (!isExist) {
            return res.status(404).json({ message: "Email or password wrong" });
        }

        const isPasswordValid = await bcrypt.compare(password, isExist.password);

        if (!isPasswordValid) {
            return res.status(404).json({ message: "Email or password wrong" });
        }

        const token = jwt.sign({ userID: isExist.id, role: isExist.role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.status(200).json({
            status: 200,
            message: "Login successful",
            user: {
                id: isExist.id,
                email: isExist.email,
                name: isExist.name,
                surname: isExist.surname
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    }
};


// Close account
export const closeAccount = async (req, res) => {
    try {
        const { userID } = req.user

        if (!userID) {
            return res.status(404).json({ message: "Token could not found!" });
        };

        const isExist = await authService.getUserByID(userID);

        if (!isExist) {
            return res.status(404).json({ message: "User not found!" });
        };

        const confirmCode = generateConfirmCode();

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: isExist.email,
            subject: 'Remove Account',
            html: closeAccountMessage(isExist.name, isExist.surname, confirmCode)
        });

        req.session.confirmCode = confirmCode;

        res.status(200).json({ message: "The confirm code has been sent to your email address" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Confirm close account
export const confirmCloseAccount = async (req, res) => {
    try {
        const { userID } = req.user;
        const confirmCode = req.session.confirmCode;
        const { code } = req.body;

        if (!userID) {
            return res.status(403).json({ message: "Could not found token!" });
        };

        if (!code || !confirmCode) {
            return res.status(400).json({ message: confirmCode === undefined ? "Please write confirmation code!" : "Confirmation code failed!" })
        };

        if (code !== confirmCode) {
            return res.status(400).json({ message: "Invalid confirmation code!" });
        };

        await authService.closeAccount(userID);
        res.status(200).json({ message: "Account has been closed" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Please write valid email" });
        };

        const isExist = await authService.getUserByEmail(email);

        if (!isExist) {
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Reset Password',
                html: isNotExist()
            });
            return;
        };

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 36000000;

        await authService.saveResetToken(email, resetToken, resetTokenExpiration);

        const url = `http://localhost:3000/help/update-password?token=${resetToken}`;

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            html: resetPasswordMessage(url)
        });

        res.status(200).json({ status: 200, message: "Password reset email has been sent! Check your inbox." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Reset password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;

        console.log(token);

        const user = await authService.getUserByResetToken(token);

        console.log(user);

        if (!user || user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ error: "Token is invalid or has expired" });
        };

        const isPasswordSame = await bcrypt.compare(newPassword, user.password);

        if (isPasswordSame) {
            return res.status(400).json({ error: "New password can not be same old password!" });
        };

        const hashNewPassword = await bcrypt.hash(newPassword, 10);

        await authService.updatePassword(user.email, hashNewPassword);
        await authService.clearResetToken(user.email);

        res.status(200).json({ status: 200, message: "Password has been reset" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Change user role
export const changeRole = async (req, res) => {
    try {
        const { infoID } = req.query;
        const { role } = req.body;

        if (!role || (role !== "user" && role !== "admin")) {
            return res.status(400).json({ message: "Please write valid role" });
        };

        const checkExist = await authService.getUserByInfoID(infoID);

        if (!checkExist) {
            return res.status(404).json({ message: "User not found" });
        };

        const changeRole = await authService.changeRole(infoID, role);
        res.status(200).json({
            status: 200,
            data: changeRole
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};