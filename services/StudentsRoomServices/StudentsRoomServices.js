const StudentsRoomDao = require("../../dao/StudentsRoomDao/StudentsRoomDao");
const { getDb } = require("../../config/dbSwitcher");

const createStudentsRoom = async (studentsRoomData, useNew) => {
    try {
        const db = await getDb(useNew);

        return await StudentsRoomDao.createStudentsRoom(studentsRoomData, db);
    } catch (error) {
        console.error("Error creating Model:", error);
        throw error;
    }
};

const getRoomsByStudentId = async (studentId, useNew) => {
    try {
        const db = await getDb(useNew);
        return await StudentsRoomDao.getRoomsByStudentId(studentId, db);
    }
    catch (error) {
        console.error("Error getting rooms by id student :", error);
        throw error;
    }

};
const updateLastMessage = async (roomId, messageId, useNew) => {
    try {
        const db = await getDb(useNew);
        return await StudentsRoomDao.updateLastMessage(roomId, messageId, db);
    }
    catch (error) {
        console.error("Error updating message:", error);
        throw error;

    }

};

const getRoomByParticipants = async (senderId, receiverId, useNew) => {
    try {
        const db = await getDb(useNew);
        return await StudentsRoomDao.getRoomByParticipants(senderId, receiverId, db);
    }
    catch (error) {
        console.error("Error getting room by participants:", error);
        throw error;

    }

};

module.exports = {
    createStudentsRoom,
    getRoomsByStudentId,
    updateLastMessage,
    getRoomByParticipants
};
