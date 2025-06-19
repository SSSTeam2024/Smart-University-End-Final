const express = require("express");
const SocieteControllers = require("../../controllers/SocieteControllers/SocieteControllers");

const router = express.Router();

router.post("/create-new", SocieteControllers.addNewSociete);
router.post("/get-by-name", SocieteControllers.getSocieteByName);
router.post("/get-by-id", SocieteControllers.getSocieteById);
router.get("/get-all", SocieteControllers.getAllSocietes);
router.delete("/delete/:id", SocieteControllers.deleteSociete);
router.put("/update/:id", SocieteControllers.updateSociete);

module.exports = router;
