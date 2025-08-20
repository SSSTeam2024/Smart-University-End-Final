const express = require("express");
const studentsMessageController = require("../../controllers/StudentsMessageController/StudentsMessageController");

const router = express.Router();

router.post(
  "/create-students-message",
  studentsMessageController.createStudentsMessage
);
router.get(
  "/load-by-latest/:roomId/:senderId",
  studentsMessageController.loadLatestMessages
);
router.get(
  "/load-by-room/:roomId/pagination",
  studentsMessageController.loadMessagesWithPagination
);
router.post("/not-seen", studentsMessageController.getNotSeenMessages);
router.put("/update-not-seen", studentsMessageController.updateNotSeenMessages);

module.exports = router;
