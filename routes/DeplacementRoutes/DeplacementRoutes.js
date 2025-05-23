const express = require("express");
const router = express.Router();
const deplacementController = require("../../controllers/DeplacementController/DeplacementController");

router.post("/add-deplacement", deplacementController.createDeplacement);

router.get("/get-all-deplacements", deplacementController.getAllDeplacements);

router.post("/get-deplacement", deplacementController.getDeplacementById);

router.put("/edit-deplacement", deplacementController.updateDeplacement);

router.delete("/delete-deplacement", deplacementController.deleteDeplacement);

// Delete many Deplacement
router.delete("/delete-many", deplacementController.deleteManyDeplacements);

// Get Deplacements by personnel id
router.get(
  "/by-personnel-id/:id",
  deplacementController.getDeplacementByPersonnelId
);

module.exports = router;
