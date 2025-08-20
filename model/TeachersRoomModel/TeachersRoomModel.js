const mongoose = require("mongoose");

const teachersRoomSchema = new mongoose.Schema(
  {
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enseignant",
        required: true,
      },
    ],
    last_message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeachersMessage",
      default: null,
    },
    nbr_unreaded_msg: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = teachersRoomSchema;
