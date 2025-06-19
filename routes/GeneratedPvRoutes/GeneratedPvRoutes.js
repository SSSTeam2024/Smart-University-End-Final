const express = require("express");
const router = express.Router();
const GeneratedPvControllers = require("../../controllers/GeneratedPvControllers/GeneratedPvControllers");

router.post("/create-new", GeneratedPvControllers.createGeneratedPv);
router.get("/get-all", GeneratedPvControllers.getGeneratedPvs);
router.patch("/update/:id", GeneratedPvControllers.updateGeneratedPv);
router.delete("/delete/:id", GeneratedPvControllers.deleteGeneratedPv);

module.exports = router;
