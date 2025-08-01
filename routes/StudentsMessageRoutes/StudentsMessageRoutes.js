const express = require('express');
const studentsMessageController = require('../../controllers/StudentsMessageController/StudentsMessageController');

const router = express.Router();

router.post('/create-students-message', studentsMessageController.createStudentsMessage);
router.get("/load-by-room/:roomId", studentsMessageController.loadLatestMessages);
router.get("/load-by-room/:roomId/pagination", studentsMessageController.loadMessagesWithPagination);

module.exports = router;