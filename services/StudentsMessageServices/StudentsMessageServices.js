const StudentsMessageDao = require("../../dao/StudentsMessageDao/StudentsMessageDao");
const { getDb } = require("../../config/dbSwitcher");
const fs = require("fs");

const { getIO, getConnectedUser, getActiveChatsPair } = require("../../socket/ioInstance");

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

async function saveFile(base64String, fileName, filePath) {
    const binaryData = Buffer.from(base64String, "base64");
    console.log("binaryData", binaryData)
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


const createStudentsMessage = async (studentsMessageData, documents, useNew) => {
    try {
        const db = await getDb(useNew);
        const saveResult = await saveMediaToServer(documents);
        if (!saveResult) {
            throw new Error("Not all files were saved successfully.");
        }
        const recipientSocket = getConnectedUser(studentsMessageData.receiverId);
        const senderSocket = getConnectedUser(studentsMessageData.senderId);
        const receiverIsOnChat = getActiveChatsPair(studentsMessageData.receiverId) === studentsMessageData.senderId;
        let status = "envoyé";
        if (recipientSocket) {
            status = receiverIsOnChat ? "vu" : "livré";
        }
        const creationResult = await StudentsMessageDao.createStudentsMessage({
            ...studentsMessageData,
            status: status,
        }, db);

        if (recipientSocket) {
            const io = getIO();
            io.to(studentsMessageData.roomId).emit("receive_message", {
                ...studentsMessageData,
                status: status,
            });
            const createdAt = new Date();
            if (receiverIsOnChat) {
                await StudentsMessageDao.updateSeenAtDate(creationResult._id, createdAt, db);
                io.to(senderSocket).emit("message_seen", {
                    to: studentsMessageData.receiverId,
                    message: studentsMessageData.text,
                    seenAt: createdAt,
                });
            }
            if (!receiverIsOnChat) {
                io.to(recipientSocket).emit("tab_bar_message_notifier", {
                    ...studentsMessageData,
                    status: status,
                });
            }
        } else {

            io.to(senderSocket).emit("receive_message", {
                ...studentsMessageData,
                status: status,
            });
        }

        return creationResult;

    } catch (error) {
        console.error("Error creating Model:", error);
        throw error;
    }
};

const loadLatestMessages = async (roomId, limit, beforeDate, useNew) => {
    try {
        const db = await getDb(useNew);
        const messages = await StudentsMessageDao.loadLatestMessages(roomId, limit, beforeDate, db);
        const totalMessages = await StudentsMessageDao.getAllMessagesByRoom(roomId, db);
        const hasMore = totalMessages.length > limit;

        return {
            messages: messages,
            hasMore,
            totalMessages,
        }
    }
    catch (error) {
        console.error("Error in loadMessagesByRoom :", error);
        throw error;
    }
};

const getNotSeenMessages = async (userId, chattingWith, useNew) => {
    try {
        const db = await getDb(useNew);
        const messages = await StudentsMessageDao.getNotSeenMessages(userId, chattingWith, db);
        return messages;
    }
    catch (error) {
        console.error("Error in loadMessages :", error);
        throw error;
    }
};

const updateNotSeenMessagesToSeen = async (userId, chattingWith, now, useNew) => {
    try {
        const db = await getDb(useNew);
        const updatedMessages = await StudentsMessageDao.updateNotSeenMessagesToSeen(userId, chattingWith, now, db);
        return updatedMessages;
    }
    catch (error) {
        console.error("Error in update Messages :", error);
        throw error;
    }
};

const loadMessagesWithPagination = async (roomId, page, limit, useNew) => {
    try {
        const db = await getDb(useNew);

        const offset = (page - 1) * limit;

        // Filter messages for the room and sort by creation date (newest first for pagination)
        const roomMessages = await StudentsMessageDao.getAllMessagesByRoom(roomId, db);

        // Get total count for hasMore calculation
        const totalMessages = roomMessages.length;
        const hasMore = offset + limit < totalMessages;

        // Get the paginated messages
        const paginatedMessages = roomMessages.slice(offset, offset + limit);

        // Reverse the paginated messages to show oldest first in the UI
        const orderedMessages = paginatedMessages.reverse();

        return {
            messages: orderedMessages,
            hasMore,
            totalMessages,
            currentPage: page,
            totalPages: Math.ceil(totalMessages / limit),
        }
    }
    catch (error) {
        console.error("Error in loadMessagesByRoom :", error);
        throw error;
    }
};

module.exports = {
    createStudentsMessage,
    loadLatestMessages,
    loadMessagesWithPagination,
    getNotSeenMessages,
    updateNotSeenMessagesToSeen
};
