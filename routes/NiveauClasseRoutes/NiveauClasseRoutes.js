const express = require("express");
const niveauClasseController = require("../../controllers/NiveauClasseControllers/NiveauClasseControllers");

const router = express.Router();

router.post("/create-niveau-classe", niveauClasseController.addNiveauClasse);
router.put(
  "/update-niveau-classe/:id",
  niveauClasseController.updateNiveauClasseById
);
// router.get('/getNote/:id', noteController.getNoteById);
router.get(
  "/get-all-niveau-classe",
  niveauClasseController.getAllNiveauxClasse
);
router.delete(
  "/delete-niveau-classe/:id",
  niveauClasseController.deleteNiveauClasseById
);
router.get(
  "/:niveauClasseId/sections",
  niveauClasseController.getSectionsByIdNiveau
);
router.get(
  "/:niveauClasseId/cycles",
  niveauClasseController.getCyclesByIdNiveau
);
// router.post('/getNotesByIdCompany',noteController.getNotesByIdCompany)
router.post("/get-niveau-value", niveauClasseController.getNiveauByValue);
module.exports = router;
