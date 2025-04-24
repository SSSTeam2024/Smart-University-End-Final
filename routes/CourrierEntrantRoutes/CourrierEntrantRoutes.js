const express = require("express");
const CourrierEntrantControllers = require("../../controllers/CourrierEntrantControllers/CourrierEntrantControllers");

const router = express.Router();

router.post("/create-new", CourrierEntrantControllers.addCourrierEntrant);
router.patch(
  "/update-by-id/:id",
  CourrierEntrantControllers.updateCourrierEntrantById
);
router.get("/get-all", CourrierEntrantControllers.getAllCourrierEntrant);
router.get("/get-last", CourrierEntrantControllers.getLastCourrierEntrant);
router.delete(
  "/delete-one/:id",
  CourrierEntrantControllers.deleteCourrierEntrantById
);

module.exports = router;
