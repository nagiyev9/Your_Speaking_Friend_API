// Path 
import { rateLimit } from "express-rate-limit";

// Custom Message
const message = {
    error: 'Too many request, please try after 2 minutes',
};

// Limiter
export const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: (req, res) => {
        res.status(409).json(message);
    },
    keyGenerator: (req) => req.body.email || req.body.password || req.ip
});