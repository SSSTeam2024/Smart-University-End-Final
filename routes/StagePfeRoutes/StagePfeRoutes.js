const express = require("express");
const stagePfeControllers = require("../../controllers/StagePfeControllers/StagePfeControllers");

const router = express.Router();

router.post("/create-new", stagePfeControllers.createStagePfe);
router.put("/update-one/:id", stagePfeControllers.updateStagePfe);
router.get("/get-all", stagePfeControllers.getStagesPfe);
router.delete("/delete/:id", stagePfeControllers.deleteStagePfe);
router.put("/assign-jury/:id", stagePfeControllers.updateJuryAssignment);
router.post("/disponibilite", stagePfeControllers.getDisponibilite);
module.exports = router;
