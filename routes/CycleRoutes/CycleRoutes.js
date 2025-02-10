const express = require("express");
const cycleController = require("../../controllers/CycleControllers/CycleControllers");

const router = express.Router();

router.post("/create-cycle", cycleController.addCycle);
router.put("/update-cycle/:id", cycleController.updateCycleById);

router.get("/get-all-cycle", cycleController.getAllCycle);
router.delete("/delete-cycle/:id", cycleController.deleteCycleById);

router.post("/get-cycle-value", cycleController.getCycleByValue);
module.exports = router;
