const mongoose = require("mongoose");

const specialiteEnseignantSchema = new mongoose.Schema(
  {
    specialite_ar: String,
    specialite_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('SpecialiteEnseignant', specialiteEnseignantSchema);
module.exports = specialiteEnseignantSchema;
