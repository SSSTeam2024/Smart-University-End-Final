const mongoose = require("mongoose");

const avisCommissionSchema = new mongoose.Schema(
  {
    commission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commission",
      default: null,
    },
    type_stage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeStage",
      default: null,
    },
    liste: [
      {
        etudiant: String,
        groupe: String,
        sujet: String,
        lieu: String,
        avis: String,
        remarques: String,
      },
    ],
    etat: String,
  },
  { timestamps: true }
);

module.exports = avisCommissionSchema;
