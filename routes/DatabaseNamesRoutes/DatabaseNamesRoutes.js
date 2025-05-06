const express = require("express");
const router = express.Router();
const DatabaseNamesControllers = require("../../controllers/DatabaseNamesControllers/DatabaseNamesControllers");

// Get all databases
router.get("/get-all", DatabaseNamesControllers.getAllDatabases);

module.exports = router;
