const mongoose = require("mongoose");

const societeSchema = new mongoose.Schema(
  {
    nom: String,
    encadrant: [String],
    matricule: String,
    adresse: String,
    responsable: String,
    siteweb: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = societeSchema;
