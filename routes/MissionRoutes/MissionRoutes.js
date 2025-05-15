const express = require("express");
const router = express.Router();
const MissionController = require("../../controllers/MissionController/MissionController");

router.post("/add-mission", MissionController.createMission);

router.get("/get-all-missions", MissionController.getAllMissions);

router.post("/get-mission", MissionController.getMissionById);

router.delete("/delete-mission", MissionController.deleteMission);

// Delete many Missions
router.delete("/delete-many", MissionController.deleteManyMissions);

router.get("/by-personnel-id/:id", MissionController.getMissionsByPersonnelId);

module.exports = router;
