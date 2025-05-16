const express = require("express");
const stagePfeControllers = require("../../controllers/StagePfeControllers/StagePfeControllers");

const router = express.Router();

router.post("/create-new", stagePfeControllers.createStagePfe);
// router.put("/update-VoieEnvoi/:id", stagePfeControllers.updateVoieEnvoiById);
router.get("/get-all", stagePfeControllers.getStagesPfe);
// router.delete("/delete-VoieEnvoi/:id", stagePfeControllers.deleteVoieEnvoiById);

module.exports = router;
