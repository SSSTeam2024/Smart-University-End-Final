const express = require("express");
const teacherPeriodController = require("../../controllers/TeacherPeriodControllers/TeacherPeriodControllers");

const router = express.Router();

router.post(
  "/create-teacher-period",
  teacherPeriodController.createTeacherPeriod
);
router.put(
  "/update-teacher-period",
  teacherPeriodController.updateTeacherPeriod
);
router.post("/get-teachers-periods", teacherPeriodController.getTeacherPeriod);
router.post(
  "/get-teacher-periods",
  teacherPeriodController.getTeacherPeriodsByTeacherId
);

router.post(
  "/periods",
  teacherPeriodController.fetchPeriodsBySemesterAndTeacherId
);

// Get all teachers periods
router.get("/get-all-periods", teacherPeriodController.getAllTeacherPeriod);

// Delete many Avis Enseignant
router.delete("/delete-many", teacherPeriodController.deleteManyPeriods);

module.exports = router;
