const StudentsRoomDao = require("../../dao/StudentsRoomDao/StudentsRoomDao");
const { getDb } = require("../../config/dbSwitcher");

const { getActiveChatsPair } = require("../../socket/ioInstance");

const createStudentsRoom = async (studentsRoomData, useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await StudentsRoomDao.createStudentsRoom(
      studentsRoomData,
      db
    );
    console.log(result);
    const populatedResult = await StudentsRoomDao.getRoomById(result._id, db);
    return populatedResult;
  } catch (error) {
    console.error("Error creating Model:", error);
    throw error;
  }
};

const getRoomsByStudentId = async (studentId, useNew) => {
  try {
    const db = await getDb(useNew);
    return await StudentsRoomDao.getRoomsByStudentId(studentId, db);
  } catch (error) {
    console.error("Error getting rooms by id student :", error);
    throw error;
  }
};
const updateAndModifyUnreadedMessagesNumber = async (
  roomId,
  messageId,
  receiverId,
  senderId,
  useNew
) => {
  try {
    const db = await getDb(useNew);
    const receiverIsOnChat = getActiveChatsPair(receiverId) === senderId;
    if (receiverIsOnChat) {
      return await StudentsRoomDao.updateAndRestartUnreadedMessagesNumber(
        roomId,
        messageId,
        db
      );
    } else {
      return await StudentsRoomDao.updateAndIncrementUnreadedMessagesNumber(
        roomId,
        messageId,
        db
      );
    }
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
};

const updateAndRestartUnreadedMessagesNumber = async (
  roomId,
  messageId,
  useNew
) => {
  try {
    const db = await getDb(useNew);
    return await StudentsRoomDao.updateAndRestartUnreadedMessagesNumber(
      roomId,
      messageId,
      db
    );
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
};

const getRoomByParticipants = async (senderId, receiverId, useNew) => {
  try {
    const db = await getDb(useNew);
    return await StudentsRoomDao.getRoomByParticipants(
      senderId,
      receiverId,
      db
    );
  } catch (error) {
    console.error("Error getting room by participants:", error);
    throw error;
  }
};

module.exports = {
  createStudentsRoom,
  getRoomsByStudentId,
  updateAndModifyUnreadedMessagesNumber,
  updateAndRestartUnreadedMessagesNumber,
  getRoomByParticipants,
};
