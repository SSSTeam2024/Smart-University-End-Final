const express = require('express');
const etudiantController = require('../../controllers/StudentController/StudentController');

const router = express.Router();

router.post('/create-etudiant', etudiantController.addStudent);
router.get('/get-all-etudiant', etudiantController.getAllStudents);
router.post('/get-etudiant', etudiantController.getStudentById);

router.delete('/delete-etudiant', etudiantController.deleteEtudiant);
router.put('/update-etudiant', etudiantController.updateStudent)

module.exports = router;