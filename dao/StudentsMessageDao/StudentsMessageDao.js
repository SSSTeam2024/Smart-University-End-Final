const studentsMessageSchema = require("../../model/StudentsMessageModel/StudentsMessageModel");
const mongoose = require("mongoose");
function getStudentsMessageSchema(dbConnection) {
  return (
    dbConnection.models.StudentsMessage ||
    dbConnection.model("StudentsMessage", studentsMessageSchema)
  );
}
const createStudentsMessage = async (message, dbName) => {
  const StudentsMessage = await getStudentsMessageSchema(dbName);
  return await StudentsMessage.create(message);
};

const loadLatestMessages = async (
  roomId,
  limit = 20,
  beforeDate = new Date(),
  dbName
) => {
  const StudentsMessage = await getStudentsMessageSchema(dbName);

  return await StudentsMessage.find({
    roomId,
    createdAt: { $lte: beforeDate },
  })
    .sort({ createdAt: -1 }) // latest messages first
    .limit(limit);
  // .populate({
  //     path: "roomId",
  // })
  // .populate({
  //     path: "senderId"
  // })
  // .populate({
  //     path: "receiverId",
  // });
};

const getAllMessagesByRoom = async (roomId, dbName) => {
  const StudentsMessage = await getStudentsMessageSchema(dbName);

  return await StudentsMessage.find({
    roomId,
  });
  // .populate({
  //     path: "roomId",
  // })
  // .populate({
  //     path: "senderId"
  // })
  // .populate({
  //     path: "receiverId",
  // });
};

const getNotSeenMessages = async (userId, chattingWith, dbName) => {
  const StudentsMessage = await getStudentsMessageSchema(dbName);
  const query = {
    senderId: chattingWith,
    receiverId: userId,
    status: { $ne: "vu" }, // Not seen messages
  };
  return await StudentsMessage.find(query);
  // .populate({
  //     path: "roomId",
  // })
  // .populate({
  //     path: "senderId"
  // })
  // .populate({
  //     path: "receiverId",
  // });
};

const updateNotSeenMessagesToSeen = async (
  userId,
  chattingWith,
  // now,
  dbName
) => {
  const StudentsMessage = await getStudentsMessageSchema(dbName);
  return await StudentsMessage.updateMany(
    {
      senderId: chattingWith,
      receiverId: userId,
      status: { $ne: "vu" },
    }, // filter
    { $set: { status: "vu", seenAt: new Date() } } // update
  );
};

const updateSeenAtDate = async (messageId, date, dbName) => {
  const StudentsMessage = await getStudentsMessageSchema(dbName);
  return await StudentsMessage.findByIdAndUpdate(
    messageId,
    {
      seenAt: date,
    },
    { new: true }
  );
};

module.exports = {
  createStudentsMessage,
  loadLatestMessages,
  getAllMessagesByRoom,
  getNotSeenMessages,
  updateNotSeenMessagesToSeen,
  updateSeenAtDate,
};
