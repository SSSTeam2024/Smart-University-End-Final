const express = require("express");
const {
  cloneDb,
  promoteDb,
  getMigratedValue,
} = require("../../controllers/CloneControllers/CloneControllers");

const router = express.Router();
router.post("/clone-db", cloneDb);
router.post("/promote", promoteDb);
router.get("/migration-status", getMigratedValue);
module.exports = router;
