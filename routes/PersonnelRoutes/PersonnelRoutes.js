const express = require("express");
const personnelController = require("../../controllers/PersonnelControllers/PersonnelControllers");

const router = express.Router();

router.post("/create-personnel", personnelController.addPersonnel);
router.get("/get-all-personnel", personnelController.getPersonnels);
router.put("/update-personnel", personnelController.updatePersonnelById);
router.get("/get-personnel/:id", personnelController.getPersonnelById);
router.delete("/delete-personnel/:id", personnelController.deletePersonnelById);
router.post("/login", personnelController.login);
router.post("/logout/:personnelId", personnelController.logout);

module.exports = router;
