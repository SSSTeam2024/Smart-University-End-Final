const express = require("express");
const PersonnelWorkingDayControllers = require("../../controllers/PersonnelWorkingDayControllers/PersonnelWorkingDayControllers");

const router = express.Router();

router.post(
  "/create-personnel-working-day-params",
  PersonnelWorkingDayControllers.addPersonnelWorkingDay
);
router.put(
  "/update-personnel-working-day",
  PersonnelWorkingDayControllers.updatePersonnelWorkingDay
);
router.get(
  "/get-personnel-working-day-params",
  PersonnelWorkingDayControllers.getPersonnelWorkingDay
);
module.exports = router;
