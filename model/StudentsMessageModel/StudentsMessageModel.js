const mongoose = require("mongoose");

const studentsMessageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Etudiant",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Etudiant",
            required: true,
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentsRoom",
            required: true,
        },
        text: {
            type: String,
            default: "",
        },
        files: [String],
        status: {
            type: String,
            enum: ["envoyé", "livré", "vu"],
            default: "envoyé",
        },
        msg_type: {
            type: String,
            default: "",
        },
        seenAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);
module.exports = studentsMessageSchema;