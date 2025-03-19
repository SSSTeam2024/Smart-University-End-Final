const express = require("express");
const AbsenceEtudiantController = require("../../controllers/AbsenceEtudiantController/AbsenceEtudiantController");

const router = express.Router();

router.post(
  "/create-absence-etudiant",
  AbsenceEtudiantController.addAbsenceEtudiant
);
router.put(
  "/update-absence-etudiant/:id",
  AbsenceEtudiantController.updateAbsenceEtudiantById
);
router.get(
  "/get-all-absence-etudiant",
  AbsenceEtudiantController.getAllAbsenceEtudiant
);
router.delete(
  "/delete-absence-etudiant/:id",
  AbsenceEtudiantController.deleteAbsenceEtudiantById
);
router.get(
  "/get-all-absence-classe/:id",
  AbsenceEtudiantController.getAllAbsenceClasse
);
module.exports = router;
