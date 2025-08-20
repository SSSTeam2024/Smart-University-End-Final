const express = require("express");
const teachersRoomController = require("../../controllers/TeachersRoomController/TeachersRoomController");

const router = express.Router();

router.post("/create-teachers-room", teachersRoomController.createTeachersRoom);
router.get(
  "/by-teacher/:teacherId",
  teachersRoomController.getRoomsByTeacherId
);
router.put(
  "/update-last-message/:roomId",
  teachersRoomController.updateAndModifyUnreadedMessagesNumber
);
router.post("/get-room", teachersRoomController.getRoomByParticipants);

module.exports = router;
