const mongoose = require("mongoose");

const courrierEntrantSchema = new mongoose.Schema(
  {
    num_ordre: String,
    date_arrive: String,
    num_courrier: String,
    date_courrier: String,
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Intervenant",
      required: false,
      default: null,
    },
    destinataire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Intervenant",
      required: false,
      default: null,
    },
    sujet: String,
    date_livraison: String,
    file: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourrierEntrant", courrierEntrantSchema);
