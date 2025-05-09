const mongoose = require("mongoose");

const resultatSchema = new mongoose.Schema(
  {
    etudiants: [
      {
        etudiant: { type: mongoose.Schema.Types.ObjectId, ref: "Etudiant" },
        moyenne_sem1: String,
        moyenne_sem2: String,
        moyenne_rattrapage: String,
        avis: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = resultatSchema;
