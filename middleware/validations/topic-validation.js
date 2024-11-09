// Import
import { check, validationResult } from "express-validator"

// Topic Validation
export const validate_topic = [
    check("topic")
        .notEmpty()
        .withMessage('Topic field can not be empty'),
    check("question_1")
        .notEmpty()
        .withMessage("Question field can not be emtpy"),
    check("question_2")
        .notEmpty()
        .withMessage("Question field can not be emtpy"),
    check("question_3")
        .notEmpty()
        .withMessage("Question field can not be emtpy"),
    check("question_4")
        .notEmpty()
        .withMessage("Question field can not be emtpy"),
    check("question_5")
        .notEmpty()
        .withMessage("Question field can not be emtpy")
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