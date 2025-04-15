const express = require("express");
const PersonnelWorkingDayControllers = require("../../controllers/PersonnelWorkingDayControllers/PersonnelWorkingDayControllers");

const router = express.Router();

router.post(
  "/create-personnel-working-day-params",
  PersonnelWorkingDayControllers.addPersonnelWorkingDay
);
router.put(
  "/update-personnel-working-day/:id",
  PersonnelWorkingDayControllers.updatePersonnelWorkingDay
);
router.get(
  "/get-personnel-working-day-params",
  PersonnelWorkingDayControllers.getPersonnelWorkingDay
);
router.delete(
  "/delete-personnel-working-day-params/:id",
  PersonnelWorkingDayControllers.deletePersonnelWorkingDay
);
module.exports = router;
