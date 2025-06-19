const express = require("express");
const AvisCommissionControllers = require("../../controllers/AvisCommissionControllers/AvisCommissionControllers");

const router = express.Router();

router.post("/create-new", AvisCommissionControllers.createAvisCommission);
router.put("/update/:id", AvisCommissionControllers.updateAvisCommission);
router.get("/get-all", AvisCommissionControllers.getAvisCommissions);
router.delete("/delete/:id", AvisCommissionControllers.deleteAvisCommission);
module.exports = router;
