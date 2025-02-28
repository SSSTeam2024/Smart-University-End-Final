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
    matiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matiere",
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
    heure: String,
    date: String,
    trimestre: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AbsenceEtudiant", AbsenceEtudiantSchema);
