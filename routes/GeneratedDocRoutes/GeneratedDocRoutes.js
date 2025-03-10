const express = require("express");
const router = express.Router();
const generatedDocController = require("../../controllers/GeneratedDocController/GeneratedDocController");

router.post("/save-generated-doc", generatedDocController.saveGeneratedDoc);
router.get(
  "/get-generated-doc-next-number/:id",
  generatedDocController.getGeneratedDocsByModelId
);
// router.get('/get-all-absence-personnel', absencePersonnelController.getAllAbsencesPersonnels);
// router.put('/edit-absence-personnel', absencePersonnelController.updateAbsencePersonnelById);
// router.delete('/delete-absence-personnel', absencePersonnelController.deleteAbsencePersonnel);

module.exports = router;
