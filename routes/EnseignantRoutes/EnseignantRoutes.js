const express = require("express");
const enseignantController = require("../../controllers/EnseignantControllers/EnseignantControllers");

const router = express.Router();

router.post("/create-enseignant", enseignantController.addEnseignant);
router.get("/get-all-enseignant", enseignantController.getEnseignants);
router.put("/update-enseignant", enseignantController.updateEnseignantById);
router.post("/get-enseignant", enseignantController.getEnseignantById);
router.post("/get-teacher-by-token", enseignantController.getTeacherByToken);
router.delete(
  "/delete-enseignant/:id",
  enseignantController.deleteEnseignantById
);
router.post(
  "/:enseignantId/papier/:papierId",
  enseignantController.assignPapierToTeacher
);

router.get("/charges-periodic", enseignantController.fetchAllTeachersPeriods);
router.get("/get-enseignants-grouped-by-grade", enseignantController.getTeachersGroupedByGrade);
// router.get("/update-teachers-password", enseignantController.updateTeachersPasswords);
router.post("/login-teacher", enseignantController.loginTeacher);

router.post("/logout/:teacherId", enseignantController.logoutTeacher);

module.exports = router;