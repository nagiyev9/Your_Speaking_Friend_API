import { logger } from "../middleware/log/logger.js";
import questionService from "../service/question.service.js";
import { generatequestionID } from "../utils/generate-code.js";

// Get all questions
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Get one question
export const getQuestion = async (req, res) => {
    try {
        const { questionID } = req.params;

        if (!questionID) {
            return res.status(400).json({ error: "questionID not found" });
        };

        const checkExist = await questionService.getQuestionByQuestionID(questionID);

        if (!checkExist) {
            return res.status(404).json({ error: "Question could not found" });
        };
        
        res.status(200).json(checkExist);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Add new question
export const addQuestion = async (req, res) => {
    try {
        const { question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3 } = req.body;

        const questionID = generatequestionID();

        const newQuestion = await questionService.addQuestion({
            question,
            correct_answer,
            wrong_answer_1,
            wrong_answer_2,
            wrong_answer_3,
            questionID
        });

        res.status(201).json({
            status: 201,
            message: "Question has been added",
            data: newQuestion
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Edit question
export const editQuestion = async (req, res) => {
    try {
        const { questionID } = req.params;
        const question = req.body;

        if (!questionID) {
            return res.status(400).json({ error: "questionID not found" });
        };

        const checkExist = await questionService.getQuestionByQuestionID(questionID);

        if (!checkExist) {
            return res.status(404).json({ error: "Question not found" });
        };

        const editQuestion = await questionService.editQuestion(questionID, question);
        res.status(200).json({
            status: 200,
            message: "Question has been editted",
            data: editQuestion
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Remove question
export const removeQuestion = async (req, res) => {
    try {
        const { questionID } = req.params;

        if (!questionID) {
            return res.status(400).json({ error: "questionID not found" });
        };

        const checkExist = await questionService.getQuestionByQuestionID(questionID);

        if (!checkExist) {
            return res.status(404).json({ error: "Question not found" });
        };

        await questionService.removeQuestion(questionID);
        res.status(200).json({
            status: 200,
            message: "Question has been removed"
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);  
    };
};