const express = require("express");
const CommissionControllers = require("../../controllers/CommissionControllers/CommissionControllers");

const router = express.Router();

router.post("/create-new", CommissionControllers.addCommission);
router.put("/update/:id", CommissionControllers.updateCommissionById);
router.get("/get-all", CommissionControllers.getAllCommission);
router.delete("/delete/:id", CommissionControllers.deleteCommissionById);
module.exports = router;
