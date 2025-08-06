const StudentsRoomService = require("../../services/StudentsRoomServices/StudentsRoomServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createStudentsRoom = async (req, res) => {
  try {
    const { nbr_unreaded_msg, last_message, students } = req.body;

    const studentsRoom = await StudentsRoomService.createStudentsRoom(
      {
        nbr_unreaded_msg,
        last_message,
        students,
      },
      useNewDb(req)
    );
    res.json(studentsRoom);
  } catch (error) {
    console.error(error);
  }
};
const getRoomsByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const rooms = await StudentsRoomService.getRoomsByStudentId(
      studentId,
      useNewDb(req)
    );
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAndModifyUnreadedMessagesNumber = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { messageId, receiverId, senderId } = req.body;

    const updatedRoom =
      await StudentsRoomService.updateAndModifyUnreadedMessagesNumber(
        roomId,
        messageId,
        receiverId,
        senderId,
        useNewDb(req)
      );
    res.json(updatedRoom);
  } catch (err) {
    console.error("Error updating last message:", err);
    res.status(500).json({ error: err.message });
  }
};

const getRoomByParticipants = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ error: "senderId et receiverId sont requis." });
    }

    const room = await StudentsRoomService.getRoomByParticipants(
      senderId,
      receiverId,
      useNewDb(req)
    );

    if (!room) {
      return res
        .status(404)
        .json({ message: "Aucune room trouvée entre ces deux étudiants." });
    }

    res.json(room);
  } catch (error) {
    console.error("Erreur lors de la récupération de la room:", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

module.exports = {
  createStudentsRoom,
  getRoomsByStudentId,
  updateAndModifyUnreadedMessagesNumber,
  getRoomByParticipants,
};
