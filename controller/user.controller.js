import { logger } from "../middleware/log/logger.js";
import userService from "../service/user.service.js";

// Get all users 
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);  
    };
};

// Get one user
export const getUserByID = async (req, res) => {
    try {
        const { userID } = req.query;

        if (!userID) {
            return res.status(400).json({ error: "User id not found" });
        };

        const user = await userService.getUserByUserID(userID);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        };

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);  
    };
};

// Ban user
export const banUser = async (req, res) => {
    try {
        const { userID } = req.query;

        if (!userID) {
            return res.status(400).json({ error: "User id not found" });
        };

        const checkExist = await userService.getUserByUserID(userID);

        if (!checkExist) {
            return res.status(404).json({ error: "User not found" }); 
        } else if (checkExist.banned === true) {
            return res.status(400).json({ error: "This user already banned" });
        };

        await userService.banUser(userID);
        res.status(200).json({status: 200, message: checkExist.username ? `${checkExist.username} banned` : 'User banned' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);  
    };
};

// Unban user
export const unbanUser = async (req, res) => {
    try {
        const { userID } = req.query;

        if (!userID) {
            return res.status(400).json({ error: "User id not found" });
        };

        const checkExist = await userService.getUserByUserID(userID);

        if (!checkExist) {
            return res.status(404).json({ error: "User not found" }); 
        } else if (checkExist.banned === false) {
            return res.status(400).json({ error: "This user already unbanned" });
        };

        await userService.unbanUser(userID);
        res.status(200).json({ status:200, message: checkExist.username ? `${checkExist.username} unbanned` : 'User unbanned' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);  
    };
};

// Change role
export const changeRole = async (req, res) => {
    try {
        const { userID } = req.query;
        const { role } = req.body;

        if (!userID) {
            return res.status(400).json({ error: "User id not found" });
        } else if (!["admin", "user"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        };

        const checkExist = await userService.getUserByUserID(userID);

        if (!checkExist) {
            return res.status(404).json({ error: "User not found" }); 
        } else if (checkExist.role === role) {
            return res.status(400).json({ error: "This user already has this role" });
        };

        await userService.changeRole(userID, role);
        res.status(200).json({status:200, message: checkExist.username ? `${checkExist.username} role has changed to ${role}` : `User role has changed to ${role}` });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);  
    };
};

// Refresh user unaban date
export const refreshUserUnbanDate = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(403).json({ error: "Could not found token!" });
        };

        const user = await userService.refreshUserUnbanDate(userID);
        res.status(200).json({ status: 200, message: "User unban date has been refreshed" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};