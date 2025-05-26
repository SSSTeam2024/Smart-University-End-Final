const express = require("express");
const SocieteControllers = require("../../controllers/SocieteControllers/SocieteControllers");

const router = express.Router();

router.post("/create-new", SocieteControllers.addNewSociete);
router.post("/get-by-name", SocieteControllers.getSocieteByName);
router.get("/get-all", SocieteControllers.getAllSocietes);
// router.delete("/delete-VoieEnvoi/:id", SocieteControllers.deleteVoieEnvoiById);

module.exports = router;
