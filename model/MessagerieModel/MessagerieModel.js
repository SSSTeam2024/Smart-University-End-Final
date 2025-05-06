const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
      userType: {
        type: String,
        enum: ["Etudiant", "Enseignant", "Personnel", "User"],
        required: true,
      },
    },
    receiver: {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
      userType: {
        type: String,
        enum: ["Etudiant", "Enseignant", "Personnel", "User"],
        required: true,
      },
    },
    forwardedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, required: false },
      userType: {
        type: String,
        enum: ["Etudiant", "Enseignant", "Personnel", "User"],
        required: false,
      },
    },
    transferredAt: { type: Date },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    attachments: [{ type: String, required: false }], // Array of file URLs
    status: {
      type: String,
      enum: ["sent", "read", "archived"],
      default: "sent",
    },

    senderStatus: {
      type: String,
      enum: ["sent", "archived", "deleted"],
      default: "sent",
    },
    receiverStatus: {
      type: String,
      enum: ["unread", "read", "archived", "deleted"],
      default: "unread",
    },
    parentMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    }, // Link to original message if it's a reply
    deletedBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        userType: {
          type: String,
          required: true,
          enum: ["Etudiant", "Enseignant", "Personnel", "User"],
        },
      },
    ],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Message", MessageSchema);
module.exports = MessageSchema;
