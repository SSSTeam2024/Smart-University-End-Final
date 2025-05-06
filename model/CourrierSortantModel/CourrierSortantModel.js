const mongoose = require("mongoose");

const courrierSortantSchema = new mongoose.Schema(
  {
    num_inscription: String,
    date_edition: String,
    voie_envoi: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VoieEnvoi",
        required: false,
        default: null,
      },
    ],
    destinataire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Intervenant",
      required: false,
      default: null,
    },
    file: String,
    sujet: String,
    observations: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model("CourrierSortant", courrierSortantSchema);
module.exports = courrierSortantSchema;
