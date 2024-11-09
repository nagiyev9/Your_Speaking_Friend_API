import phrasalVerbService from "../service/phrasal-verb.service.js";
import { generateTopicAndVerbID } from "../utils/generate-code.js";
import { logger } from "../middleware/log/logger.js";


// Get all phrasal verbs
export const getAllPhrasalVerbs = async (req, res) => {
    try {
        const phrasalVerbs = await phrasalVerbService.getAllPhrasalVerbs();
        res.status(200).json(phrasalVerbs);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Get one phrasal verb
export const getPhrasalVerbByVerbID = async (req, res) => {
    try {
        const { verbID } = req.params;

        if (!verbID) {
            return res.status(400).json({ error: "Verb id not found" });
        };

        const phrasalVerb = await phrasalVerbService.getPhrasalVerbByVerbID(verbID);

        if (!phrasalVerb) {
            return res.status(404).json({ error: "Phrasal verb not found" });
        };

        res.status(200).json(phrasalVerb);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Add new phrasal verb
export const addPhrasalVerb = async (req, res) => {
    try {
        const { verb, description } = req.body;

        const verbID = generateTopicAndVerbID();

        const newPhrasalVerb = await phrasalVerbService.addPhrasalVerb({
            verb,
            description,
            verbID: verbID
        });

        res.status(201).json({
            status: 201,
            message: "Phrasal verb has been added",
            data: newPhrasalVerb
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Edit phrasal verb
export const editPhrasalVerb = async (req, res) => {
    try {
        const { verbID } = req.params;
        const phrasal = req.body;

        if (!verbID) {
            return res.status(400).json({ error: "Verb id not found" });
        };

        const checkExist = await phrasalVerbService.getPhrasalVerbByVerbID(verbID);

        if (!checkExist) {
            return res.status(404).json({ error: "Phrasal verb not found" });    
        };

        const editPhrasalVerb = await phrasalVerbService.editPhrasalVerb(verbID, phrasal);
        res.status(200).json({
            status: 200,
            message: "Phrasal verb has been editted",
            data: editPhrasalVerb
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Remove phrasal verb
export const removePhrasalVerb = async (req, res) => {
    try {
        const { verbID } = req.params;

        if (!verbID) {
            return res.status(400).json({ error: "Verb id not found" });
        };

        const checkExist = await phrasalVerbService.getPhrasalVerbByVerbID(verbID);

        if (!checkExist) {
            return res.status(404).json({ error: "Phrasal verb not found" });    
        };

        await phrasalVerbService.removePhrasalVerb(verbID);
        res.status(200).json({
            status: 200,
            message: "Phrasal verb has been removed"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};