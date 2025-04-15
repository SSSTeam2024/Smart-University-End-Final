const express = require("express");
const router = express.Router();
const absencePersonnelController = require("../../controllers/AbsencePersonnelController/AbsencePersonnelController");

router.post(
  "/add-absence-personnel",
  absencePersonnelController.addAbsencePersonnel
);
router.get(
  "/get-all-absence-personnel",
  absencePersonnelController.getAllAbsencesPersonnels
);
router.post(
  "/get-absence-personnel",
  absencePersonnelController.getAbsencePersonnelById
);
router.put(
  "/edit-absence-personnel/:id",
  absencePersonnelController.updateAbsencePersonnelById
);
router.delete(
  "/delete-absence-personnel/:id",
  absencePersonnelController.deleteAbsencePersonnel
);

module.exports = router;
