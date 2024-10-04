const express = require('express');
const router = express.Router();
const avisPersonnelController = require('../../controllers/AvisPersonnelController/AvisPersonnelController');

// Create a new reclamation
router.post('/add-avis-personnel', avisPersonnelController.createAvisPersonnel);

// Get all demandePersonnels
router.get('/get-all-avis-personnels', avisPersonnelController.getAllAvisPersonnels);

// Get a single demandePersonnel by ID
router.get('/get-avis-personnel/:id', avisPersonnelController.getAvisPersonnelById);

// Update a demandePersonnel by ID
router.put('/edit-avis-personnel/:id', avisPersonnelController.updateAvisPersonnel);

// Delete a demandePersonnel by ID
router.delete('/delete-avis-personnel/:id', avisPersonnelController.deleteAvisPersonnel);

module.exports = router;