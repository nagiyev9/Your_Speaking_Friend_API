import express from "express";

const router = express.Router();

import { getAllPhrasalVerbs, getPhrasalVerbByVerbID, addPhrasalVerb, editPhrasalVerb, removePhrasalVerb } from "../controller/phrasal-verb.controller.js";
import { validate_phrasal_verb, handle_validation_errors } from "../middleware/validations/phrasal-verb-validation.js";

router.get('/all', getAllPhrasalVerbs);
router.get('/:verbID', getPhrasalVerbByVerbID);

router.post('/add', [validate_phrasal_verb, handle_validation_errors], addPhrasalVerb);
router.put('/edit/:verbID', editPhrasalVerb);
router.delete('/remove/:verbID', removePhrasalVerb);

export default router;