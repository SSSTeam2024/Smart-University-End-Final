const express = require("express");
const parcoursController = require("../../controllers/ParcoursControllers/ParcoursControllers");

const router = express.Router();

router.post("/create-parcours", parcoursController.createParcours);
router.put("/update-parcours/:id", parcoursController.updateParcours);
router.get("/get-all-parcours", parcoursController.getAllParcours);
router.delete("/delete-parcours/:id", parcoursController.deleteParcours);
router.post("/get-parcours-by-value", parcoursController.getParcoursByValue);

module.exports = router;
