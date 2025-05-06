const express = require("express");
const DemandeTirageController = require("../../controllers/DemandeTirageControllers/DemandeTirageControllers");

const router = express.Router();

router.post("/create-demande-tirage", DemandeTirageController.addDemandeTirage);
router.get(
  "/get-all-demandes-tirage",
  DemandeTirageController.getAllDemandeTirage
);

// router.put(
//   "/update-absence-etudiant/:id",
//   AbsenceEtudiantController.updateAbsenceEtudiantById
// );
router.delete(
  "/delete-demande-tirage/:id",
  DemandeTirageController.deleteDemandeTirage
);

router.put(
  "/update-etat-demande-tirage/:id",
  DemandeTirageController.updateEtatDemandeTirage
);
// router.get(
//   "/get-all-absence-classe/:id",
//   AbsenceEtudiantController.getAllAbsenceClasse
// );

router.get(
  "/get-demande-tirage-by-id-teacher/:enseignantId",
  DemandeTirageController.getDemandesTirageByTeacherId
);

// Delete many Demandes Tirages
router.delete(
  "/delete-many",
  DemandeTirageController.deleteManyDemandesTirages
);

module.exports = router;
