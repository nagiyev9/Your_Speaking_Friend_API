import { supabase } from "../database/db.js";
import { logger } from "../middleware/log/logger.js";

// Get all forms
const getAllForms = () => {
    return supabase
        .from('forms')
        .select('*')
        .order('id', { ascending: true })
        .then(({ data, error }) => {
            if (error) {
                logger.error(error.message);
                return null;
            }
            return data;
        });
};

// Get form by id
const getFormByID = (id) => {
    return supabase
        .from('forms')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
            if (error) {
                logger.error(error.message);
                return null;
            }
            return data;
        });
};

// Submit new form
const submitForm = (form) => {
    return supabase
        .from('forms')
        .insert([form])
        .then(({ data, error }) => {
            if (error) {
                logger.error(error.message);
                return null;
            }
            return data;
        });
};

// Change form status
const changeFormStatus = (id, isRead) => {
    return supabase
        .from('forms')
        .update({ isRead })
        .eq('id', id)
        .then(({ data, error }) => {
            if (error) {
                logger.error(error.message);
                return null;
            }
            return data;
        });
};

// Delete form
const deleteForm = (id) => {
    return supabase
        .from('forms')
        .delete()
        .eq('id', id)
        .then(({ data, error }) => {
            if (error) {
                logger.error(error.message);
                return null;
            }
            return data;
        });
};

export default {
    getAllForms,
    getFormByID,
    submitForm,
    changeFormStatus,
    deleteForm
};
