const express = require("express");
const router = express.Router();
const demandeEtudiantController = require("../../controllers/DemandeEtudiantControllers/DemandeEtudiantControllers");

// Create a new demand
router.post(
  "/add-demande-etudiant",
  demandeEtudiantController.createDemandeEtudiant
);

// Get all demandeEtudiants
router.get(
  "/get-all-demande-etudiants",
  demandeEtudiantController.getAllDemandeEtudiants
);

// Get a single demandeEtudiant by ID
router.get(
  "/get-demande-etudiant/:id",
  demandeEtudiantController.getDemandeEtudiantById
);

// Update a demandeEtudiant by ID
router.put(
  "/edit-demande-etudiant",
  demandeEtudiantController.updateDemandeEtudiant
);

// Delete a demandeEtudiant by ID
router.delete(
  "/delete-demande-etudiant/:id",
  demandeEtudiantController.deleteDemandeEtudiant
);
router.get(
  "/get-demande-by-id-student/:studentId",
  demandeEtudiantController.getDemandesByStudentId
);

// Delete many Demandes Etudiant
router.delete(
  "/delete-many",
  demandeEtudiantController.deleteManyDemandeEtudiant
);

module.exports = router;
