import express from "express";

const router = express.Router();

import { getAllTopics, getTopic, addTopic, editTopic, removeTopic } from "../controller/topic.controller.js";
import { handle_validation_errors, validate_topic } from "../middleware/validations/topic-validation.js";

router.get('/all', getAllTopics);
router.get('/:topicID', getTopic);

router.post('/add', [validate_topic, handle_validation_errors], addTopic);

router.put('/edit/:topicID', editTopic);

router.delete('/remove/:topicID', removeTopic);

export default router;