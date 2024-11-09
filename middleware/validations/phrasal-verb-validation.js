// Import
import { check, validationResult } from "express-validator"

// Phrasal Verb Validation
export const validate_phrasal_verb = [
    check("verb")
        .notEmpty()
        .withMessage('Verb field can not be empty'),
    check("description")
        .notEmpty()
        .withMessage("Description field can not be emtpy"),
];


// Handling Errors
export const handle_validation_errors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((error) => ({
                field: error.param,
                message: error.msg
            }))
        });
    };
    next();
};