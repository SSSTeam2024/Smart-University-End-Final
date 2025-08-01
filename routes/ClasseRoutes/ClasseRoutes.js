const express = require("express");
const classeController = require("../../controllers/ClasseControllers/ClasseControllers");

const router = express.Router();

router.post("/create-classe", classeController.addClasse);
router.put("/update-classe", classeController.updateClasseById);
router.get("/get-classe/:id", classeController.getClasseById);
router.get("/get-all-classe", classeController.getAllClasses);
router.delete("/delete-classe/:id", classeController.deleteClasseById);
router.put(
  "/assign-matieres-to-classe/:classeId",
  classeController.assignMatieresToClasseController
);
router.delete(
  "/delete-assigned-matiere/:classeId/:matiereId",
  classeController.deleteAssignedMatiereFromClasse
);
router.get("/:classeId/matieres", classeController.getAssignedMatieres);
router.post("/get-classes-by-teacher", classeController.getAllClassesByTeacher);
router.post("/get-classe-by-value", classeController.getClasseByValue);

router.put(
  "/assign-parcours/:classeId/:parcoursId",
  classeController.assignParcoursToClasse
);

router.post("/get-classes-by-niveau", classeController.getAllClassesByNiveauId);

module.exports = router;
