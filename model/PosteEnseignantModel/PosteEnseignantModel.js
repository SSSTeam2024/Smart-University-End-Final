const mongoose = require("mongoose");

const posteEnseignantSchema = new mongoose.Schema(
  {
    poste_ar: String,
    poste_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('PosteEnseignant', posteEnseignantSchema);
module.exports = posteEnseignantSchema;
