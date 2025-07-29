const express = require('express');
const router = express.Router();
const encadrementController = require('../../controllers/EncadrementController/EncadrementController');

router.post('/create', encadrementController.createEncadrement);
router.get('/', encadrementController.getAllEncadrements);
router.post('/get-by-id', encadrementController.getEncadrementById);
router.put('/:id', encadrementController.updateEncadrement);
router.delete('/:id', encadrementController.deleteEncadrement);
router.post("/by-enseignant", encadrementController.getGroupedEncadrementsByEnseignant);

module.exports = router;
