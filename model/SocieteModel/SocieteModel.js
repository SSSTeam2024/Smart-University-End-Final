const mongoose = require("mongoose");

const societeSchema = new mongoose.Schema(
  {
    nom: String,
    encadrant: [String],
    infos: String,
  },
  { timestamps: true }
);

module.exports = societeSchema;
