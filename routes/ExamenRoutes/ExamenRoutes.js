const express = require("express");
const examenController = require("../../controllers/ExamenControllers/ExamenControllers");

const router = express.Router();

router.post("/create-examen", examenController.createExamen);
router.put("/update-examen/:id", examenController.updateExamenById);
router.get("/get-examen/:id", examenController.getExamenById);
router.get("/get-all-examen", examenController.getExamens);
router.delete("/delete-examen", examenController.deleteExamenById);

module.exports = router;