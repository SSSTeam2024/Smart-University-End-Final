const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema(
  {
    nom_classe_fr: String,
    nom_classe_ar: String,
    departement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departement",
      default: null,
    },
    niveau_classe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NiveauClasse",
      default: null,
    },
    matieres: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Matiere", default: null },
    ],
    parcours: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcours",
      default: null,
    },
    semestres: [String],
    groupe_number: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Classe", classeSchema);
module.exports = classeSchema;
