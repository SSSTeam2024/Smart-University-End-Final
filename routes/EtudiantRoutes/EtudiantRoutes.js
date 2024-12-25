const express = require("express");
const etudiantController = require("../../controllers/StudentController/StudentController");

const router = express.Router();

router.post("/create-etudiant", etudiantController.addStudent);
router.get("/get-all-etudiant", etudiantController.getAllStudents);
router.post("/get-etudiant", etudiantController.getStudentById);
router.delete("/delete-etudiant", etudiantController.deleteEtudiant);
router.put("/update-groupe-classe", etudiantController.updateGroupeClasse);
router.put('/update-etudiant', etudiantController.updateStudent)
router.get('/get-etudiant/:id', etudiantController.getEtudiantById);
module.exports = router;
