// const mongoose = require("mongoose");

// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//   {
//     senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     senderType: { type: String, enum: ["Etudiant", "Enseignant", "Personnel"], required: true },
//     receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     receiverType: { type: String, enum: ["Etudiant", "Enseignant", "Personnel"], required: true },
//     text: String,
//     image: String,
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", messageSchema);
// export default Message;

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      type: { type: String, enum: ["Etudiant", "Enseignant", "Personnel"], required: true },
    },
    receiver: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      type: { type: String, enum: ["Etudiant", "Enseignant", "Personnel"], required: true },
    },
    text: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message-old', messageSchema);
