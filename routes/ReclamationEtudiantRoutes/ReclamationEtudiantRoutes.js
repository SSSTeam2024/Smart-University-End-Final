const express = require("express");
const router = express.Router();
const reclamationController = require("../../controllers/ReclamationEtudiantControllers/ReclamationEtudiantControllers");

// Create a new reclamation
router.post("/add-reclamation", reclamationController.createReclamation);

// Get all reclamations
router.get("/get-all-reclamations", reclamationController.getAllReclamations);

// Get a single reclamation by ID
router.get("/get-reclamation/:id", reclamationController.getReclamationById);

// Update a reclamation by ID
router.put("/edit-reclamation", reclamationController.updateReclamation);

// Delete a reclamation by ID
router.delete(
  "/delete-reclamation/:id",
  reclamationController.deleteReclamation
);

router.delete("/delete-many", reclamationController.deleteManyReclamations);

router.get(
  "/by-etudiant-id/:id",
  reclamationController.getReclamationsByEtudiantId
);

module.exports = router;
