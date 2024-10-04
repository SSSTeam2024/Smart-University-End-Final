const express = require('express');
const router = express.Router();
const avisEnseignantController = require('../../controllers/AvisEnseignantController/AvisEnseignantController');


router.post('/add-avis-enseignant', avisEnseignantController.createAvisEnseignant);


router.get('/get-all-avis-enseignants', avisEnseignantController.getAllAvisEnseignants);


router.get('/get-avis-enseignant/:id', avisEnseignantController.getAvisEnseignantById);


router.put('/edit-avis-enseignant/:id', avisEnseignantController.updateAvisEnseignant);

router.delete('/delete-avis-enseignant/:id', avisEnseignantController.deleteAvisEnseignant);

module.exports = router;