const express = require("express");
const IntervenantControllers = require("../../controllers/IntervenantControllers/IntervenantControllers");

const router = express.Router();

router.post("/create-new", IntervenantControllers.addIntervenant);
router.patch("/update-one/:id", IntervenantControllers.updateIntervenantById);
router.get("/get-all", IntervenantControllers.getAllIntervenant);
router.delete("/delete-one/:id", IntervenantControllers.deleteIntervenantById);

module.exports = router;
