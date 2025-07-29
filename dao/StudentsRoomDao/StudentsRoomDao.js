const studentsRoomSchema = require("../../model/StudentsRoomModel/StudentsRoomModel");
const mongoose = require('mongoose');
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


const getRoomsByStudentId = async (studentId, dbName) => {
    const StudentsRoom = await getStudentsRoomSchema(dbName);
    return await StudentsRoom.find({
        students: studentId
    }).populate("last_message").sort({ updatedAt: -1 });
}

const updateLastMessage = async (roomId, messageId, dbName) => {
    const StudentsRoom = await getStudentsRoomSchema(dbName);
    return await StudentsRoom.findByIdAndUpdate(
        roomId,
        {
            last_message: messageId,
            $inc: { nbr_unreaded_msg: 1 }
        },
        { new: true }
    );
};
const getRoomByParticipants = async (senderId, receiverId, dbName) => {
    const StudentsRoom = await getStudentsRoomSchema(dbName);
    return await StudentsRoom.findOne({
        students: { $all: [senderId, receiverId] }
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
    updateLastMessage,
    getRoomByParticipants
};