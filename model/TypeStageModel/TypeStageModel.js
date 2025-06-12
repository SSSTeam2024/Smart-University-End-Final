const mongoose = require("mongoose");

const typeStageSchema = new mongoose.Schema(
  {
    nom_fr: String,
    nom_ar: String,
    choix: String,
    niveau: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NiveauClasse",
      default: null,
    },
    max_etudiant: String,
    duree_min: String,
    date_debut: String,
    date_fin: String,
    avec_encadrement: String,
    avec_soutenance: String,
    avec_commission: String,
    avec_validation_soutenance: String,
    localite: String,
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classe" }],
    encadrement: [String],
    soutenance: [String],
    files: [
      {
        nomFr: { type: String },
        nomAr: { type: String },
        type: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("typeStage", typeStageSchema);
module.exports = typeStageSchema;
