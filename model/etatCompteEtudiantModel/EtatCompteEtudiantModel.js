const mongoose = require("mongoose");

const etatCompteEtudiantSchema = new mongoose.Schema(
  {
    etat_ar: String,
    etat_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('EtatCompteEtudiant', etatCompteEtudiantSchema);
module.exports = etatCompteEtudiantSchema;
