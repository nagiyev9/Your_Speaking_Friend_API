import { supabase } from "../database/db.js";  
import { logger } from "../middleware/log/logger.js";

// Get all topics
export const getAllTopics = async () => {
    const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        logger.error(error.message);
        return [];
    }
    return data;
};

// Get one topic by topicID
export const getTopicByTopicID = async topicID => {
    const { data, error } = await supabase
        .from('topics')
        .select('*')
        .eq('topicID', topicID)
        .single();

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Add new topic
export const addTopic = async topic => {
    const { data, error } = await supabase
        .from('topics')
        .insert([topic]);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Edit topic
export const editTopic = async (topicID, topic) => {
    const { data, error } = await supabase
        .from('topics')
        .update(topic)
        .eq('topicID', topicID);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Remove topic
export const removeTopic = async topicID => {
    const { error } = await supabase
        .from('topics')
        .delete()
        .eq('topicID', topicID);

    if (error) {
        logger.error(error.message);
        return false;
    }
    return true;
};

export default {
    getAllTopics,
    getTopicByTopicID,
    addTopic,
    editTopic,
    removeTopic
};
