import { logger } from "../middleware/log/logger.js";
import { supabase } from "../database/db.js";

// Get all users
const getAllUsers = async () => {
    const { data, error } = await supabase
        .from('auth')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Get user by ID
const getUserByID = async id => {
    const { data, error } = await supabase
        .from('auth')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Get user by infoID
const getUserByInfoID = async infoID => {
    const { data, error } = await supabase
        .from('auth')
        .select('*')
        .eq('infoID', infoID)
        .single();

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Get user by email
const getUserByEmail = async email => {
    const { data, error, count } = await supabase
        .from('auth')
        .select('*')
        .eq('email', email);

    if (error) {
        logger.error(error.message);
        return null;
    }

    if (count === 0) {
        return null;
    }

    if (count > 1) {
        logger.error('Multiple users found with the same email');
        return null;
    }

    return data[0];
};


// Get user by reset token
const getUserByResetToken = async token => {
    const { data, error } = await supabase
        .from('auth')
        .select('*')
        .eq('resetToken', token)
        .single();

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Create new account
const createNewAccount = async (auth) => {
    const { data, error } = await supabase
        .from('auth')
        .insert([auth]);

    if (error) {
        logger.error(error.message);
        return null;
    }
    
    return data;
};

// Close account
const closeAccount = async id => {
    const { data, error } = await supabase
        .from('auth')
        .delete()
        .eq('id', id);

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Update password
const updatePassword = async (email, password) => {
    const { data, error } = await supabase
        .from('auth')
        .update({ password })
        .eq('email', email);

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Save reset token
const saveResetToken = async (email, resetToken, resetTokenExpiration) => {
    const { data, error } = await supabase
        .from('auth')
        .update({
            resetToken,
            resetTokenExpiration
        })
        .eq('email', email);

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Clear reset token
const clearResetToken = async email => {
    const { data, error } = await supabase
        .from('auth')
        .update({
            resetToken: null,
            resetTokenExpiration: null
        })
        .eq('email', email);

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

// Change user role
const changeRole = async (infoID, role) => {
    const { data, error } = await supabase
        .from('auth')
        .update({ role })
        .eq('infoID', infoID);

    if (error) {
        logger.error(error.message);
        return null;
    }

    return data;
};

export default {
    getAllUsers,
    getUserByID,
    getUserByInfoID,
    getUserByEmail,
    getUserByResetToken,
    createNewAccount,
    closeAccount,
    updatePassword,
    saveResetToken,
    clearResetToken,
    changeRole
};