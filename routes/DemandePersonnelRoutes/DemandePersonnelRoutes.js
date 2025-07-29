const express = require("express");
const router = express.Router();
const demandePersonnelController = require("../../controllers/demandePersonnelControllers/DemandePersonnelControllers");

// Create a new reclamation
router.post(
  "/add-demande-personnel",
  demandePersonnelController.createDemandePersonnel
);

// Get all demandePersonnels
router.get(
  "/get-all-demande-Personnels",
  demandePersonnelController.getAllDemandePersonnels
);

// Get a single demandePersonnel by ID
router.get(
  "/get-demande-Personnel/:id",
  demandePersonnelController.getDemandePersonnelById
);

// Update a demandePersonnel by ID
router.put(
  "/edit-demande-Personnel",
  demandePersonnelController.updateDemandePersonnel
);

// Delete a demandePersonnel by ID
router.delete(
  "/delete-demande-personnel/:id",
  demandePersonnelController.deleteDemandePersonnel
);
// Handle demand
router.post(
  "/handle-demande-personnel",
  demandePersonnelController.handleDemandePersonnel
);

// Delete many Demandes Personnel
router.delete(
  "/delete-many",
  demandePersonnelController.deleteManyDemandePersonnel
);

// Get Demande By Personnel ID
router.get(
  "/by-personnel-id/:id",
  demandePersonnelController.getDemandesByPersonnelId
);

//get demands by id admin

router.get("/by-admin/:adminId", demandePersonnelController.getDemandesByAdmin);

module.exports = router;
