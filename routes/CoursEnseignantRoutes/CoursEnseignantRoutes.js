const express = require("express");
const router = express.Router();
const CoursEnseignantControllers = require("../../controllers/CoursEnseignantControllers/CoursEnseignantControllers");

router.post("/add-cour", CoursEnseignantControllers.addCoursEnseignant);

router.get("/get-all-cours", CoursEnseignantControllers.getCoursEnseignants);

router.post(
  "/get-cour-by-id",
  CoursEnseignantControllers.getCoursEnseignantById
);

router.post(
  "/get-cour-by-id-classe",
  CoursEnseignantControllers.getCoursEnseignantByIdClasse
);

router.delete("/delete-cour", CoursEnseignantControllers.deleteCoursEnseignant);
router.put("/edit-cours/:id", CoursEnseignantControllers.updateCoursEnseignant);

router.get("/get-cours-by-id-teacher/:enseignantId", CoursEnseignantControllers.getSupportCoursByTeacherId);

router.delete(
  "/delete-support-cours/:id",
  CoursEnseignantControllers.deleteSupportCoursEnseignant
);

module.exports = router;
