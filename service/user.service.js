import { supabase } from "../database/db.js";
import { logger } from "../middleware/log/logger.js";

// Get all users
const getAllUsers = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        logger.error(error.message);
        return [];
    }
    return data;
};

// Get one user by userID
const getUserByUserID = async userID => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('userID', userID)
        .single();

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Ban user
const banUser = async userID => {
    const { data, error } = await supabase
        .from('users')
        .update({ banned: true })
        .eq('userID', userID);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Unban user
const unbanUser = async userID => {
    const { data, error } = await supabase
        .from('users')
        .update({
            banned: false,
            last_unban_date: new Date().toISOString()
        })
        .eq('userID', userID);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Change user role
const changeRole = async (userID, role) => {
    const { data, error } = await supabase
        .from('users')
        .update({ role: role })
        .eq('userID', userID);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

// Refresh user unban date
const refreshUserUnbanDate = async userID => {
    const { data, error } = await supabase
        .from('users')
        .update({ last_unban_date: new Date().toISOString() })
        .eq('userID', userID);

    if (error) {
        logger.error(error.message);
        return null;
    }
    return data;
};

export default {
    getAllUsers,
    getUserByUserID,
    banUser,
    unbanUser,
    changeRole,
    refreshUserUnbanDate
};
