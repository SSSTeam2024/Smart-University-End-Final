const mongoose = require("mongoose");

const examenSchema = new mongoose.Schema(
  {
    annee_universitaire: String,
    semestre: String,
    session: String,
    type_examen: String,
    heure_debut: String,
    heure_fin: String,
    period: String,
    group_surveillants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" },
    ],
    salle: { type: mongoose.Schema.Types.ObjectId, ref: "Salle" },
    matiere: { type: mongoose.Schema.Types.ObjectId, ref: "Matiere" },
    enseignant: [{ type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" }],
    classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Examen", examenSchema);
