const teachersRoomSchema = require("../../model/TeachersRoomModel/TeachersRoomModel");
const mongoose = require("mongoose");
function getTeachersRoomSchema(dbConnection) {
  return (
    dbConnection.models.TeachersRoom ||
    dbConnection.model("TeachersRoom", teachersRoomSchema)
  );
}
const createTeachersRoom = async (teachersRoom, dbName) => {
  const TeachersRoom = await getTeachersRoomSchema(dbName);
  return await TeachersRoom.create(teachersRoom);
};

const getRoomById = async (roomId, dbName) => {
  const TeachersRoom = await getTeachersRoomSchema(dbName);
  return await TeachersRoom.findById(roomId).populate("teachers");
};

const getRoomsByTeacherId = async (teacherId, dbName) => {
  const TeachersRoom = await getTeachersRoomSchema(dbName);
  return await TeachersRoom.find({
    teachers: teacherId,
    last_message: { $ne: null },
  })
    .populate("last_message")
    .populate("teachers")
    .sort({ updatedAt: -1 });
};

const updateAndIncrementUnreadedMessagesNumber = async (
  roomId,
  messageId,
  dbName
) => {
  const TeachersRoom = await getTeachersRoomSchema(dbName);
  return await TeachersRoom.findByIdAndUpdate(
    roomId,
    {
      last_message: messageId,
      $inc: { nbr_unreaded_msg: 1 },
    },
    { new: true }
  )
    .populate("last_message")
    .populate("teachers");
};

const updateAndRestartUnreadedMessagesNumber = async (
  roomId,
  messageId,
  dbName
) => {
  const TeachersRoom = await getTeachersRoomSchema(dbName);
  const result = await TeachersRoom.findByIdAndUpdate(
    roomId,
    {
      last_message: messageId,
      nbr_unreaded_msg: 0,
    },
    { new: true }
  );
  return result;
};

const getRoomByParticipants = async (senderId, receiverId, dbName) => {
  const TeachersRoom = await getTeachersRoomSchema(dbName);
  return await TeachersRoom.findOne({
    teachers: { $all: [senderId, receiverId] },
  })
    .populate({
      path: "teachers",
    })
    .populate({
      path: "last_message",
    });
};

module.exports = {
  createTeachersRoom,
  getRoomsByTeacherId,
  updateAndIncrementUnreadedMessagesNumber,
  updateAndRestartUnreadedMessagesNumber,
  getRoomByParticipants,
  getRoomById,
};
