const express = require('express');
const router = express.Router();
const avisEtudiantController = require('../../controllers/AvisEtudiantController/AvisEtudiantController');

// Create a new reclamation
router.post('/add-avis-etudiant', avisEtudiantController.createAvisEtudiant);

// Get all demandeEtudiants
router.get('/get-all-avis-etudiants', avisEtudiantController.getAllAvisEtudiants);

// Get a single demandeEtudiant by ID
router.get('/get-avis-etudiant/:id', avisEtudiantController.getAvisEtudiantById);

// Update a demandeEtudiant by ID
router.put('/edit-avis-etudiant/:id', avisEtudiantController.updateAvisEtudiant);

// Delete a demandeEtudiant by ID
router.delete('/delete-avis-etudiant/:id', avisEtudiantController.deleteAvisEtudiant);

module.exports = router;