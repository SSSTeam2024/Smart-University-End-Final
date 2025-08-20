const TeachersRoomService = require("../../services/TeachersRoomServices/TeachersRoomServices");

function useNewDb(req) {
  return req.headers["x-use-new-db"] === "true";
}

const createTeachersRoom = async (req, res) => {
  try {
    const { nbr_unreaded_msg, last_message, teachers } = req.body;

    const teachersRoom = await TeachersRoomService.createTeachersRoom(
      {
        nbr_unreaded_msg,
        last_message,
        teachers,
      },
      useNewDb(req)
    );
    res.json(teachersRoom);
  } catch (error) {
    console.error(error);
  }
};
const getRoomsByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const rooms = await TeachersRoomService.getRoomsByTeacherId(
      teacherId,
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
      await TeachersRoomService.updateAndModifyUnreadedMessagesNumber(
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

    const room = await TeachersRoomService.getRoomByParticipants(
      senderId,
      receiverId,
      useNewDb(req)
    );

    if (!room) {
      return res
        .status(404)
        .json({ message: "Aucune room trouvée entre ces deux enseignants." });
    }

    res.json(room);
  } catch (error) {
    console.error("Erreur lors de la récupération de la room:", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

module.exports = {
  createTeachersRoom,
  getRoomsByTeacherId,
  updateAndModifyUnreadedMessagesNumber,
  getRoomByParticipants,
};
