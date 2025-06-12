const express = require("express");
const TypeStageControllers = require("../../controllers/TypeStageControllers/TypeStageControllers");

const router = express.Router();

router.post("/create-new", TypeStageControllers.addTypeStage);
router.put("/update/:id", TypeStageControllers.updateTypeStageById);
router.get("/get-all", TypeStageControllers.getAllTypeStage);
router.delete("/delete/:id", TypeStageControllers.deleteTypeStageById);
router.post("/get-by-id", TypeStageControllers.getTypeStageById);

module.exports = router;
