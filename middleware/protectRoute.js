// Path
import jwt from "jsonwebtoken";
import { logger } from "./log/logger.js";

// Protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided!" });
        };

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal server error" });
    };
};