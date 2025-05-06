const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      type: {
        type: String,
        enum: ["Etudiant", "Enseignant", "Personnel"],
        required: true,
      },
    },
    receiver: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      type: {
        type: String,
        enum: ["Etudiant", "Enseignant", "Personnel"],
        required: true,
      },
    },
    text: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Message-old', messageSchema);
module.exports = messageSchema;
