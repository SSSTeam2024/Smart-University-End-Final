const express = require('express');
const diversDocExtraController = require('../../controllers/DiversDocExtraControllers/DiversDocExtraControllers');

const router = express.Router();

router.post('/create-divers-doc-extra', diversDocExtraController.createDiversDocExtra);
router.put('/update-divers-doc-extra/:id', diversDocExtraController.updateDiversDocExtraById);
router.get('/get-divers-doc-extra/:id', diversDocExtraController.getDiversDocExtraById);
router.get('/get-divers-doc-extra-by-model-id/:id', diversDocExtraController.getDiversDocExtraByModelId);
router.get('/get-all-divers-doc-extra', diversDocExtraController.getAllDiversDocExtra);
router.delete('/delete-divers-doc-extra/:id', diversDocExtraController.deleteDiversDocExtraById);

module.exports = router;