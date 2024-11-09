import express from "express";

const router = express.Router();

import { getAllForms, submitForm, changeFormStatus, deleteForm } from "../controller/form.controller.js";
import { isAdmin } from "../middleware/checkAdmin.js";

router.get('/all', [isAdmin], getAllForms);
router.post('/submit', submitForm);
router.put('/change-status/:id', [isAdmin], changeFormStatus);
router.delete('/delete/:id', [isAdmin], deleteForm);

export default router;