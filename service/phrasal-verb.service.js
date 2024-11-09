import { supabase } from "../database/db.js";
import { logger } from "../middleware/log/logger.js";

// Get all phrasal verbs
export const getAllPhrasalVerbs = async () => {
    const { data, error } = await supabase
        .from('phrasals')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        logger.error(error.message);
        return [];
    }
    return data;
};

// Get one phrasal verb by verbID
export const getPhrasalVerbByVerbID = async verbID => {
    const { data, error } = await supabase
        .from('phrasals')
        .select('*')
        .eq('verbID', verbID)
        .single();

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Add new phrasal verb
export const addPhrasalVerb = async phrasal => {
    const { data, error } = await supabase
        .from('phrasals')
        .insert([phrasal]);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Edit phrasal verb
export const editPhrasalVerb = async (verbID, phrasal) => {
    const { data, error } = await supabase
        .from('phrasals')
        .update(phrasal)
        .eq('verbID', verbID);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Remove phrasal verb
export const removePhrasalVerb = async verbID => {
    const { error } = await supabase
        .from('phrasals')
        .delete()
        .eq('verbID', verbID);

    if (error) {
        logger.error(error.message);
        return false;
    }
    return true;
};

export default {
    getAllPhrasalVerbs,
    getPhrasalVerbByVerbID,
    addPhrasalVerb,
    editPhrasalVerb,
    removePhrasalVerb
};
