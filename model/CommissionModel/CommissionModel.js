const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema(
  {
    titre_fr: String,
    titre_ar: String,
    date_creation: String,
    date_fin: String,
    groupes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Classe", default: null },
    ],
    membres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enseignant",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

module.exports = commissionSchema;
