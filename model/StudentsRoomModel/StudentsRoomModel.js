const mongoose = require("mongoose");

const studentsRoomSchema = new mongoose.Schema(
    {
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Etudiant",
                required: true,
            },
        ],
        last_message: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentsMessage",
            default: null
        },
        nbr_unreaded_msg: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = studentsRoomSchema;
