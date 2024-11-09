import express from "express";

const router = express.Router();

import { getAllQuestions, getQuestion, addQuestion, editQuestion, removeQuestion } from "../controller/question.controller.js";
import { validate_question, handle_validation_errors } from "../middleware/validations/question-validation.js";

router.get('/all', getAllQuestions);
router.get('/:questionID', getQuestion);

router.post('/add', [validate_question, handle_validation_errors], addQuestion);

router.put('/edit/:questionID', editQuestion);

router.delete('/remove/:questionID', removeQuestion);

export default router;