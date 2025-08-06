const StudentsMessageDao = require("../../dao/StudentsMessageDao/StudentsMessageDao");
const { getDb } = require("../../config/dbSwitcher");
const fs = require("fs");
const StudentsRoomService = require("../StudentsRoomServices/StudentsRoomServices");
const StudentsRoomDao = require("../../dao/StudentsRoomDao/StudentsRoomDao");

const {
  getIO,
  getConnectedUser,
  getActiveChatsPair,
} = require("../../socket/ioInstance");

async function saveMediaToServer(documents) {
  try {
    let counter = 0;
    for (const file of documents) {
      await saveFile(file.base64String, file.name, file.path);
      counter++;
      console.log(`File number ${counter} saved`);
    }
    if (counter === documents.length) return true;
  } catch (error) {
    console.error("Error saving media files:", error);
    throw error;
  }
}

function cleanBase64(input) {
  const trimmed = input.trim();

  const dataUrlRegex = /^data:(.*);base64,(.*)$/;
  const match = trimmed.match(dataUrlRegex);

  if (match) {
    const mimeType = match[1]; // e.g., image/png
    const cleanBase64 = match[2]; // actual base64 string
    return {
      isClean: false,
      cleanBase64,
      mimeType,
    };
  }

  // If not a data URL, assume it's already clean
  return {
    isClean: true,
    cleanBase64: trimmed,
  };
}

async function saveFile(base64String, fileName, filePath) {
  const binaryData = Buffer.from(
    cleanBase64(base64String).cleanBase64,
    "base64"
  );

  const fullFilePath = filePath + fileName;
  try {
    fs.writeFile(fullFilePath, binaryData, "binary", (err) => {
      if (err) {
        console.error("Error saving the file:", err);
      } else {
        console.log("File saved successfully!");
      }
    });
  } catch (err) {
    console.error("Error saving the file:", err);
    throw err;
  }
}

const createStudentsMessage = async (
  studentsMessageData,
  documents,
  useNew
) => {
  try {
    const db = await getDb(useNew);
    const saveResult = await saveMediaToServer(documents);
    if (!saveResult) {
      throw new Error("Not all files were saved successfully.");
    }
    const recipientSocket = getConnectedUser(studentsMessageData.receiverId);

    const senderSocket = getConnectedUser(studentsMessageData.senderId);

    const receiverIsOnChat =
      getActiveChatsPair(studentsMessageData.receiverId) ===
      studentsMessageData.senderId;
    let status = "envoyé";
    if (recipientSocket) {
      status = receiverIsOnChat ? "vu" : "livré";
    }
    const creationResult = await StudentsMessageDao.createStudentsMessage(
      {
        ...studentsMessageData,
        status: status,
      },
      db
    );
    let updatedRoom;
    if (receiverIsOnChat) {
      updatedRoom =
        await StudentsRoomDao.updateAndRestartUnreadedMessagesNumber(
          creationResult.roomId,
          creationResult._id,
          db
        );
    } else {
      updatedRoom =
        await StudentsRoomDao.updateAndIncrementUnreadedMessagesNumber(
          creationResult.roomId,
          creationResult._id,
          db
        );
    }

    const io = getIO();
    if (recipientSocket) {
      io.to(studentsMessageData.roomId).emit("receive_message", creationResult);
      const createdAt = new Date();
      if (receiverIsOnChat) {
        await StudentsMessageDao.updateSeenAtDate(
          creationResult._id,
          createdAt,
          db
        );
        io.to(senderSocket).emit("message_seen", {
          to: studentsMessageData.receiverId,
          message: studentsMessageData.text,
          seenAt: createdAt,
        });
      }
      if (!receiverIsOnChat) {
        io.to(recipientSocket).emit(
          "tab_bar_message_notifier",
          creationResult,
          updatedRoom
        );
      }
    } else {
      io.to(senderSocket).emit("receive_message", creationResult);
    }

    return creationResult;
  } catch (error) {
    console.error("Error creating Model:", error);
    throw error;
  }
};

const loadLatestMessages = async (
  roomId,
  senderId,
  limit,
  beforeDate,
  useNew
) => {
  try {
    const db = await getDb(useNew);
    const messages = await StudentsMessageDao.loadLatestMessages(
      roomId,
      limit,
      beforeDate,
      db
    );
    let sortedMessages = [];
    let hasMore = false;
    let totalMessages = [];

    if (messages.length > 0) {
      totalMessages = await StudentsMessageDao.getAllMessagesByRoom(roomId, db);
      hasMore = totalMessages.length > limit;

      sortedMessages = messages.reverse();

      if (
        sortedMessages[sortedMessages.length - 1].receiverId.toString() ===
        senderId
      ) {
        await StudentsRoomDao.updateAndRestartUnreadedMessagesNumber(
          roomId,
          sortedMessages[sortedMessages.length - 1]._id.toString(),
          db
        );
      }
    }

    return {
      messages: sortedMessages,
      hasMore,
      totalMessages,
    };
  } catch (error) {
    console.error("Error in loadMessagesByRoom :", error);
    throw error;
  }
};

const getNotSeenMessages = async (userId, chattingWith, useNew) => {
  try {
    const db = await getDb(useNew);
    const messages = await StudentsMessageDao.getNotSeenMessages(
      userId,
      chattingWith,
      db
    );

    return messages;
  } catch (error) {
    console.error("Error in loadMessages :", error);
    throw error;
  }
};

const updateNotSeenMessagesToSeen = async (userId, chattingWith, useNew) => {
  try {
    const db = await getDb(useNew);
    const updatedMessages =
      await StudentsMessageDao.updateNotSeenMessagesToSeen(
        userId,
        chattingWith,
        db
      );
    return updatedMessages;
  } catch (error) {
    console.error("Error in update Messages :", error);
    throw error;
  }
};

const loadMessagesWithPagination = async (roomId, page, limit, useNew) => {
  try {
    const db = await getDb(useNew);

    // Get all messages sorted newest first
    const allMessages = await StudentsMessageDao.getAllMessagesByRoom(
      roomId,
      db
    );
    const sortedByNewest = allMessages.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const totalMessages = sortedByNewest.length;
    const totalPages = Math.ceil(totalMessages / limit);
    const offset = (page - 1) * limit;

    // Get page slice from newest-first list
    const paginated = sortedByNewest.slice(offset, offset + limit);

    // Reverse the page to be oldest → newest for UI
    const messages = paginated.reverse();

    const hasMore = page < totalPages;

    return {
      messages, // Chronological order within the page
      hasMore,
      totalMessages,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    console.error("Error in loadMessagesWithPagination:", error);
    throw error;
  }
};

module.exports = {
  createStudentsMessage,
  loadLatestMessages,
  loadMessagesWithPagination,
  getNotSeenMessages,
  updateNotSeenMessagesToSeen,
};
