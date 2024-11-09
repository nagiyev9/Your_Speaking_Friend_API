import { logger } from "./log/logger.js";

export const isAdmin = async (req, res, next) => {
    try {
        const { role } = req.user;

        if (role !== "admin" || !role) {
            return res.status(400).json({ message: "You do not have permission to use this function" });
        };

        next();
    } catch (error) {
        logger.error(error);
    };
};