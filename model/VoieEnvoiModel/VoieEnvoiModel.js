const mongoose = require("mongoose");

const voieEnvoiSchema = new mongoose.Schema(
  {
    titre: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("VoieEnvoi", voieEnvoiSchema);
