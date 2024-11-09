// Import
import { check, validationResult } from "express-validator"

// Register Validation 
export const validate_register = [
    check("email")
        .isEmail()
        .withMessage("Please enter a valid email!"),
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password must be greater than 8!")
        .matches(/\d/)
        .withMessage("Password must have minimum 1 number!")
        .matches(/[a-z]/)
        .withMessage('Password must have minimum 1 lowercase letter!')
        .matches(/[A-Z]/)
        .withMessage("Password must have minimum 1 uppercase letter")
        .matches(/[\W_]/)
        .withMessage("Password must have minimum 1 special character!")
];

export const validate_reset_password = [
    check("newPassword")
        .isLength({ min: 8 })
        .withMessage("Password must be greater than 8!")
        .matches(/\d/)
        .withMessage("Password must have minimum 1 number!")
        .matches(/[a-z]/)
        .withMessage('Password must have minimum 1 lowercase letter!')
        .matches(/[A-Z]/)
        .withMessage("Password must have minimum 1 uppercase letter")
        .matches(/[\W_]/)
        .withMessage("Password must have minimum 1 special character!")
];

// Login Validation
export const validate_login = [
    check("email")
        .notEmpty()
        .withMessage('Email field can not be empty')
        .isEmail()
        .withMessage("Please write valid email"),
    check("password")
        .notEmpty()
        .withMessage("Please write password")
];

// Confirm Code Validation
export const validate_confirmCode = [
    check("email")
        .isEmail()
        .withMessage("Please write valid email")
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