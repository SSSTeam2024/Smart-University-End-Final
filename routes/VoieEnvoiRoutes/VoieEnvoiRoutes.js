const express = require("express");
const VoieEnvoiController = require("../../controllers/VoieEnvoiController/VoieEnvoiController");

const router = express.Router();

router.post("/create-voie-envoi", VoieEnvoiController.addVoieEnvoi);
router.put("/update-VoieEnvoi/:id", VoieEnvoiController.updateVoieEnvoiById);
router.get("/get-all-VoieEnvoi", VoieEnvoiController.getAllVoieEnvoi);
router.delete("/delete-VoieEnvoi/:id", VoieEnvoiController.deleteVoieEnvoiById);

module.exports = router;
