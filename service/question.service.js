import { supabase } from "../database/db.js";
import { logger } from "../middleware/log/logger.js";

// Get all questions
export const getAllQuestions = async () => {
    const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        logger.error(error.message);
        return [];
    }
    return data;
};

// Get one question by questionID
export const getQuestionByQuestionID = async questionID => {
    const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('questionID', questionID)
        .single();

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Add new question
export const addQuestion = async question => {
    const { data, error } = await supabase
        .from('questions')
        .insert([question]);

    if (error) {
        console.log(error);
        logger.error(error.message);
        return null;
    }
    return data;
};

// Edit question
export const editQuestion = async (questionID, question) => {
    const { data, error } = await supabase
        .from('questions')
        .update(question)
        .eq('questionID', questionID);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Remove question
export const removeQuestion = async questionID => {
    const { error } = await supabase
        .from('questions')
        .delete()
        .eq('questionID', questionID);

    if (error) {
        logger.error(error.message);
        return false;
    }
    return true;
};

export default {
    getAllQuestions,
    getQuestionByQuestionID,
    addQuestion,
    editQuestion,
    removeQuestion
};
