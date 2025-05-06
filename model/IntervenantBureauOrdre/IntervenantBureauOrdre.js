const mongoose = require("mongoose");

const intervenantSchema = new mongoose.Schema(
  {
    nom_fr: String,
    nom_ar: String,
    cin: String,
    matricule: String,
    phone: String,
    email: String,
    site: String,
    address: String,
    abbreviation: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Intervenant", intervenantSchema);
module.exports = intervenantSchema;
