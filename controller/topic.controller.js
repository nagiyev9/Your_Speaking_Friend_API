import { logger } from "../middleware/log/logger.js";
import topicService from "../service/topic.service.js";
import { generateTopicAndVerbID } from "../utils/generate-code.js";

// Get all topics
export const getAllTopics = async (req, res) => {
    try {
        const topics = await topicService.getAllTopics();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Get one topic
export const getTopic = async (req, res) => {
    try {
        const { topicID } = req.params;

        if (!topicID) {
            return res.status(400).json({ error: "Topic id not found" });
        };

        const checkExist = await topicService.getTopicByTopicID(topicID);

        if (!checkExist) {
            return res.status(404).json({ error: "Topic could not found" });
        };
        
        res.status(200).json(checkExist);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Add new topic
export const addTopic = async (req, res) => {
    try {
        const { topic, question_1, question_2, question_3, question_4, question_5 } = req.body;

        const topicID = generateTopicAndVerbID();

        const newTopic = await topicService.addTopic({
            topic,
            question_1,
            question_2,
            question_3,
            question_4,
            question_5,
            topicID
        });

        res.status(201).json({
            status: 201,
            message: "Topic has been added",
            data: newTopic
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Edit topic
export const editTopic = async (req, res) => {
    try {
        const { topicID } = req.params;
        const topic = req.body;

        if (!topicID) {
            return res.status(400).json({ error: "Topic id not found" });
        };

        const checkExist = await topicService.getTopicByTopicID(topicID);

        if (!checkExist) {
            return res.status(404).json({ error: "Topic not found" });
        };

        const editTopic = await topicService.editTopic(topicID, topic);
        res.status(200).json({
            status: 200,
            message: "Topic has been editted",
            data: editTopic
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Remove topic
export const removeTopic = async (req, res) => {
    try {
        const { topicID } = req.params;

        if (!topicID) {
            return res.status(400).json({ error: "Topic id not found" });
        };

        const checkExist = await topicService.getTopicByTopicID(topicID);

        if (!checkExist) {
            return res.status(404).json({ error: "Topic not found" });
        };

        await topicService.removeTopic(topicID);
        res.status(200).json({
            status: 200,
            message: "Topic has been removed"
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);  
    };
};