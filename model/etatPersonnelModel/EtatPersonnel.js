const mongoose = require("mongoose");

const etatPersonnelSchema = new mongoose.Schema(
  {
    etat_ar: String,
    etat_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('EtatPersonnel', etatPersonnelSchema);
module.exports = etatPersonnelSchema;
