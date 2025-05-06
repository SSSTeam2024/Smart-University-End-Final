const mongoose = require("mongoose");

const etatCompteEnseignantSchema = new mongoose.Schema(
  {
    etat_ar: String,
    etat_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('EtatCompteEnseignant', etatCompteEnseignantSchema);
module.exports = etatCompteEnseignantSchema;
