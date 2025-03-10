const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AbsenceEtudiantSchema = new Schema(
  {
    classe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: false,
      default: null,
    },
    enseignant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      required: false,
      default: null,
    },
    etudiants: [
      {
        etudiant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Etudiant",
          required: false,
          default: null,
        },
        typeAbsent: String,
      },
    ],
    departement: { type: mongoose.Schema.Types.ObjectId, ref: "Departement" },
    date: String,
    trimestre: String,
    seance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seance",
      required: false,
      default: null,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AbsenceEtudiant", AbsenceEtudiantSchema);
