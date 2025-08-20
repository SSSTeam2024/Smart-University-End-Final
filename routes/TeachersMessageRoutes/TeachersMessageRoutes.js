const express = require("express");
const teachersMessageController = require("../../controllers/TeachersMessageController/TeachersMessageController");

const router = express.Router();

router.post(
  "/create-teachers-message",
  teachersMessageController.createTeachersMessage
);
router.get(
  "/load-by-latest/:roomId/:senderId",
  teachersMessageController.loadLatestMessages
);
router.get(
  "/load-by-room/:roomId/pagination",
  teachersMessageController.loadMessagesWithPagination
);
router.post("/not-seen", teachersMessageController.getNotSeenMessages);
router.put("/update-not-seen", teachersMessageController.updateNotSeenMessages);

module.exports = router;
