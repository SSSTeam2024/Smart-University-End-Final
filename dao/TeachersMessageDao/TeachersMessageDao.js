const teachersMessageSchema = require("../../model/TeachersMessageModel/TeachersMessageModel");
const mongoose = require("mongoose");
function getTeachersMessageSchema(dbConnection) {
  return (
    dbConnection.models.TeachersMessage ||
    dbConnection.model("TeachersMessage", teachersMessageSchema)
  );
}
const createTeachersMessage = async (message, dbName) => {
  const TeachersMessage = await getTeachersMessageSchema(dbName);
  return await TeachersMessage.create(message);
};

const loadLatestMessages = async (
  roomId,
  limit = 20,
  beforeDate = new Date(),
  dbName
) => {
  const TeachersMessage = await getTeachersMessageSchema(dbName);

  return await TeachersMessage.find({
    roomId,
    createdAt: { $lte: beforeDate },
  })
    .sort({ createdAt: -1 })
    .limit(limit);
};

const getAllMessagesByRoom = async (roomId, dbName) => {
  const TeachersMessage = await getTeachersMessageSchema(dbName);

  return await TeachersMessage.find({
    roomId,
  });
};

const getNotSeenMessages = async (userId, chattingWith, dbName) => {
  const TeachersMessage = await getTeachersMessageSchema(dbName);
  const query = {
    senderId: chattingWith,
    receiverId: userId,
    status: { $ne: "vu" }, // Not seen messages
  };
  return await TeachersMessage.find(query);
};

const updateNotSeenMessagesToSeen = async (userId, chattingWith, dbName) => {
  const TeachersMessage = await getTeachersMessageSchema(dbName);
  return await TeachersMessage.updateMany(
    {
      senderId: chattingWith,
      receiverId: userId,
      status: { $ne: "vu" },
    },
    { $set: { status: "vu", seenAt: new Date() } }
  );
};

const updateSeenAtDate = async (messageId, date, dbName) => {
  const TeachersMessage = await getTeachersMessageSchema(dbName);
  return await TeachersMessage.findByIdAndUpdate(
    messageId,
    {
      seenAt: date,
    },
    { new: true }
  );
};

module.exports = {
  createTeachersMessage,
  loadLatestMessages,
  getAllMessagesByRoom,
  getNotSeenMessages,
  updateNotSeenMessagesToSeen,
  updateSeenAtDate,
};
