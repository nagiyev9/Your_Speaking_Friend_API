import { logger } from "../middleware/log/logger.js";
import formService from "../service/form.service.js";

// Get all forms
export const getAllForms = async (req, res) => {
    try {
        const forms = await formService.getAllForms();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Submit new form
export const submitForm = async (req, res) => {
    try {
        const form = req.body;
        console.log(form);
        const newForm = await formService.sumbitForm({
            name: form.name,
            surname: form.surname,
            email: form.email,
            message: form.message
        });
        res.status(201).json({
            status: 201,
            message: "Form has been submitted",
            data: newForm
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Change form status
export const changeFormStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isRead } = req.body;

        const checkExist = await formService.getFormByID(id);

        if (!checkExist) {
            return res.status(404).json({ error: "Form not found" });
        };

        const changedForm = await formService.changeFormStatus(id, checkExist.isRead === true ? false : true);
        res.status(200).json({
            status: 200,
            message: "Form status has been changed",
            data: changedForm
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};

// Delete form
export const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedForm = await formService.deleteForm(id);
        res.status(200).json({
            status: 200,
            message: "Form has been deleted"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        logger.error(error.message);
    };
};