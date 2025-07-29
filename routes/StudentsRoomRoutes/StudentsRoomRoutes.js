const express = require('express');
const studentsRoomController = require('../../controllers/StudentsRoomController/StudentsRoomController');

const router = express.Router();

router.post('/create-students-room', studentsRoomController.createStudentsRoom);
router.get('/by-student/:studentId', studentsRoomController.getRoomsByStudentId);
router.put("/update-last-message/:roomId", studentsRoomController.updateLastMessage);
router.post("/get-room", studentsRoomController.getRoomByParticipants);



module.exports = router;