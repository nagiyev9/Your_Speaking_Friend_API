// Import
import { check, validationResult } from "express-validator"

// Question Validation
export const validate_question = [
    check("question")
        .notEmpty()
        .withMessage('Question field can not be empty'),
    check("correct_answer")
        .notEmpty()
        .withMessage("Answer field can not be emtpy"),
    check("wrong_answer_1")
        .notEmpty()
        .withMessage("Answer field can not be emtpy"),
    check("wrong_answer_2")
        .notEmpty()
        .withMessage("Answer field can not be emtpy"),
    check("wrong_answer_3")
        .notEmpty()
        .withMessage("Answer field can not be emtpy")
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