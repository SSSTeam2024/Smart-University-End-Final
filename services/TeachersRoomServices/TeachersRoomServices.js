const TeachersRoomDao = require("../../dao/TeachersRoomDao/TeachersRoomDao");
const { getDb } = require("../../config/dbSwitcher");

const { getActiveChatsPair } = require("../../socket/ioInstance");

const createTeachersRoom = async (teachersRoomData, useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await TeachersRoomDao.createTeachersRoom(
      teachersRoomData,
      db
    );

    const populatedResult = await TeachersRoomDao.getRoomById(result._id, db);
    return populatedResult;
  } catch (error) {
    console.error("Error creating Model:", error);
    throw error;
  }
};

const getRoomsByTeacherId = async (teacherId, useNew) => {
  try {
    const db = await getDb(useNew);
    return await TeachersRoomDao.getRoomsByTeacherId(teacherId, db);
  } catch (error) {
    console.error("Error getting rooms by id teacher :", error);
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
    const receiverIsOnChat =
      getActiveChatsPair(receiverId, "teacher") === senderId;
    if (receiverIsOnChat) {
      return await TeachersRoomDao.updateAndRestartUnreadedMessagesNumber(
        roomId,
        messageId,
        db
      );
    } else {
      return await TeachersRoomDao.updateAndIncrementUnreadedMessagesNumber(
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
    return await TeachersRoomDao.updateAndRestartUnreadedMessagesNumber(
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
    return await TeachersRoomDao.getRoomByParticipants(
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
  createTeachersRoom,
  getRoomsByTeacherId,
  updateAndModifyUnreadedMessagesNumber,
  updateAndRestartUnreadedMessagesNumber,
  getRoomByParticipants,
};
