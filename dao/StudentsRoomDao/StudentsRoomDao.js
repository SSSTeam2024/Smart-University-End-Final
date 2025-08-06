const studentsRoomSchema = require("../../model/StudentsRoomModel/StudentsRoomModel");
const mongoose = require("mongoose");
function getStudentsRoomSchema(dbConnection) {
  return (
    dbConnection.models.StudentsRoom ||
    dbConnection.model("StudentsRoom", studentsRoomSchema)
  );
}
const createStudentsRoom = async (studentsRoom, dbName) => {
  const StudentsRoom = await getStudentsRoomSchema(dbName);
  return await StudentsRoom.create(studentsRoom);
};

const getRoomById = async (roomId, dbName) => {
  const StudentsRoom = await getStudentsRoomSchema(dbName);
  return await StudentsRoom.findById(roomId).populate("students");
};

const getRoomsByStudentId = async (studentId, dbName) => {
  const StudentsRoom = await getStudentsRoomSchema(dbName);
  return await StudentsRoom.find({
    students: studentId,
    last_message: { $ne: null },
  })
    .populate("last_message")
    .populate("students")
    .sort({ updatedAt: -1 });
};

const updateAndIncrementUnreadedMessagesNumber = async (
  roomId,
  messageId,
  dbName
) => {
  const StudentsRoom = await getStudentsRoomSchema(dbName);
  return await StudentsRoom.findByIdAndUpdate(
    roomId,
    {
      last_message: messageId,
      $inc: { nbr_unreaded_msg: 1 },
    },
    { new: true }
  )
    .populate("last_message")
    .populate("students");
};

const updateAndRestartUnreadedMessagesNumber = async (
  roomId,
  messageId,
  dbName
) => {
  const StudentsRoom = await getStudentsRoomSchema(dbName);
  const result = await StudentsRoom.findByIdAndUpdate(
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
  const StudentsRoom = await getStudentsRoomSchema(dbName);
  return await StudentsRoom.findOne({
    students: { $all: [senderId, receiverId] },
  })
    .populate({
      path: "students",
    })
    .populate({
      path: "last_message",
    });
};

module.exports = {
  createStudentsRoom,
  getRoomsByStudentId,
  updateAndIncrementUnreadedMessagesNumber,
  updateAndRestartUnreadedMessagesNumber,
  getRoomByParticipants,
  getRoomById,
};
