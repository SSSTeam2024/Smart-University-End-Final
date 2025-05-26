const express = require("express");
const stageProControllers = require("../../controllers/StageProControllers/StageProControllers");

const router = express.Router();

router.post("/create-new", stageProControllers.createStagePro);
router.put("/update-one/:id", stageProControllers.updateStagePro);
router.get("/get-all", stageProControllers.getStagesPro);
router.delete("/delete/:id", stageProControllers.deleteStagePro);

module.exports = router;
