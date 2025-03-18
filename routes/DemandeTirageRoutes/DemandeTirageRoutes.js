const express = require("express");
const DemandeTirageController = require("../../controllers/DemandeTirageControllers/DemandeTirageControllers");

const router = express.Router();

router.post(
  "/create-demande-tirage",
  DemandeTirageController.addDemandeTirage
);
router.get(
  "/get-all-demandes-tirage",
  DemandeTirageController.getAllDemandeTirage
);

// router.put(
//   "/update-absence-etudiant/:id",
//   AbsenceEtudiantController.updateAbsenceEtudiantById
// );
// router.delete(
//   "/delete-absence-etudiant/:id",
//   AbsenceEtudiantController.deleteAbsenceEtudiantById
// );
// router.get(
//   "/get-all-absence-classe/:id",
//   AbsenceEtudiantController.getAllAbsenceClasse
// );
module.exports = router;
