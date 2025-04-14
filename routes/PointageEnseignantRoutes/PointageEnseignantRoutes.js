const express = require("express");
const PointageEnseignantControllers = require("../../controllers/PointageEnseignantControllers/PointageEnseignantControllers");

const router = express.Router();

router.post("/create-new", PointageEnseignantControllers.addPointageEnseignant);
router.put(
  "/update-one/:id",
  PointageEnseignantControllers.updatePointageEnseignant
);
router.get(
  "/get-by-id/:id",
  PointageEnseignantControllers.getPointageEnseignantById
);
router.get("/get-all", PointageEnseignantControllers.getAllPointageEnseignant);
router.delete("/delete-one/:id", PointageEnseignantControllers.deleteCycleById);
router.get(
  "/get-by-enseignant-id/:id",
  PointageEnseignantControllers.getPointageByEnseignantId
);
module.exports = router;
