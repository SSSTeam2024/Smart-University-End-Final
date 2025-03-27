const express = require('express');
const templateBodyController = require('../../controllers/TemplateBodyController/templateBodyController');

const router = express.Router();

router.post('/create-template-body', templateBodyController.addTemplateBody);
router.get('/get-all-template-body', templateBodyController.getAllTemplateBodys);
router.post('/get-template-body', templateBodyController.getAllTemplateBodyById);
router.delete('/delete-template-body/:id', templateBodyController.deleteTemplateBody);
router.post('/get-template-bodies-by-context', templateBodyController.getTemplateBodyByContext);
module.exports = router;