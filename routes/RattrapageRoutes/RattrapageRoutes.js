const express = require("express");
const rattarapageController = require("../../controllers/RattrapageControllers/RattrapageControllers");

const router = express.Router();

router.post("/create-rattrapage", rattarapageController.createRattrapage);
router.get("/get-all-rattrapage", rattarapageController.getRattrapages);
// router.delete("/delete-type-seance/:id", typeSeanceController.deleteTypeSeance);
// router.put("/update-type-seance", typeSeanceController.updateTypeSeance);
router.put(
  "/updateRattrapage/:id",
  rattarapageController.updateRattrapageEtatStatus
);
router.get(
  "/get-rattrapage-by-id-class/:classId",
  rattarapageController.getRattrapagesByClassId
);

router.get(
  "/get-rattrapage-by-id-teacher/:teacherId",
  rattarapageController.getRattrapagesByTeacherId
);

// Delete many Rattrapages
router.delete("/delete-many", rattarapageController.deleteManyRattrapages);
module.exports = router;
