const mongoose = require("mongoose");

const generatedPvSchema = new mongoose.Schema(
  {
    titre: String,
    content: String,
    commission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commission",
      default: null,
    },
    fichier: String,
  },
  { timestamps: true }
);

module.exports = generatedPvSchema;
