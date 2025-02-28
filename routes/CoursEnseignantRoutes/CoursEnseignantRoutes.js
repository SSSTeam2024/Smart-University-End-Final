const express = require("express");
const router = express.Router();
const CoursEnseignantControllers = require("../../controllers/CoursEnseignantControllers/CoursEnseignantControllers");

router.post("/add-cour", CoursEnseignantControllers.addCoursEnseignant);

router.get("/get-all-cours", CoursEnseignantControllers.getCoursEnseignants);

router.post(
  "/get-cour-by-id",
  CoursEnseignantControllers.getCoursEnseignantById
);

// router.put('/edit-actualite', CoursEnseignantControllers.updateActualite);

router.delete("/delete-cour", CoursEnseignantControllers.deleteCoursEnseignant);

module.exports = router;
