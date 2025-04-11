const express = require("express");
const CourrierSortantControllers = require("../../controllers/CourrierSortantControllers/CourrierSortantControllers");

const router = express.Router();

router.post("/create-new", CourrierSortantControllers.addCourrierSortant);
router.patch(
  "/update-by-id/:id",
  CourrierSortantControllers.updateCourrierSortantById
);
router.get("/get-all", CourrierSortantControllers.getAllCourrierSortant);
router.delete(
  "/delete-one/:id",
  CourrierSortantControllers.deleteCourrierSortantById
);

module.exports = router;
