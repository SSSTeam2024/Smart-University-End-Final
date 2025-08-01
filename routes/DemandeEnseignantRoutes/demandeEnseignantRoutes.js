const express = require("express");
const router = express.Router();
const demandeEnseignantController = require("../../controllers/demandeEnseignantControllers/demandeEnseignantControllers");

// Create a new reclamation
router.post(
  "/add-demande-Enseignant",
  demandeEnseignantController.createDemandeEnseignant
);

// Get all demandeEnseignants
router.get(
  "/get-all-demande-Enseignants",
  demandeEnseignantController.getAllDemandeEnseignants
);

// Get a single demandeEnseignant by ID
router.get(
  "/get-demande-Enseignant/:id",
  demandeEnseignantController.getDemandeEnseignantById
);

// Update a demandeEnseignant by ID
router.put(
  "/edit-demande-Enseignant",
  demandeEnseignantController.updateDemandeEnseignant
);

// Delete a demandeEnseignant by ID
router.delete(
  "/delete-demande-Enseignant/:id",
  demandeEnseignantController.deleteDemandeEnseignant
);
router.get(
  "/get-demande-by-id-teacher/:enseignantId",
  demandeEnseignantController.getDemandesByTeacherId
);
// Handle demand
router.post(
  "/handle-demande-enseignant",
  demandeEnseignantController.handleDemandeEnseignant
);

// Delete many Demandes Enseignant
router.delete(
  "/delete-many",
  demandeEnseignantController.deleteManyDemandeEnseignant
);

//get demands by id admin

router.get("/by-admin/:adminId", demandeEnseignantController.getDemandesByAdmin);

module.exports = router;
