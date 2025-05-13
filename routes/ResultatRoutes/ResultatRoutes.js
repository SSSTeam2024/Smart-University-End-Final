const express = require("express");
const ResultatControllers = require("../../controllers/ResultatControllers/ResultatControllers");

const router = express.Router();

router.post("/create-new", ResultatControllers.addResultat);
router.get("/get-all", ResultatControllers.getAllResultat);
router.patch("/edit/:id", ResultatControllers.updateResultat);
router.delete("/delete/:id", ResultatControllers.deleteResultatById);
module.exports = router;
