const studentsMessageSchema = require("../../model/StudentsMessageModel/StudentsMessageModel");
const mongoose = require('mongoose');
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


const loadMessagesByRoom = async (roomId, limit = 20, beforeDate = new Date(), dbName) => {
    const StudentsMessage = await getStudentsMessageSchema(dbName);

    return await StudentsMessage.find({
        roomId,
        createdAt: { $lt: beforeDate }
    })
        .sort({ createdAt: -1 }) // latest messages first
        .limit(limit)
        .populate({
            path: "roomId",
        })
        .populate({
            path: "senderId"
        })
        .populate({
            path: "receiverId",
        });
};



module.exports = {
    createStudentsMessage,
    loadMessagesByRoom

};