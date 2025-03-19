const mongoose = require("mongoose");

const ficheVoeuxSchema = new mongoose.Schema(
  {
    fiche_voeux_classes: [
      {
        matieres: String,
        classe: [
          {
            subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "Matiere" },
            class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" }
          }
        ]
      },
    ],
    jours: [
      {
        jour: String,
        temps: String,
      },
    ],
    enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "Enseignant" },

    semestre: String,
    remarque: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("ficheVoeux", ficheVoeuxSchema);