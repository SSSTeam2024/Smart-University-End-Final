const mongoose = require("mongoose");

const niveauClasseSchema = new mongoose.Schema(
  {
    name_niveau_ar: String,
    name_niveau_fr: String,
    abreviation: String,
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "SectionClasse" }],
    cycles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cycle" }],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("NiveauClasse", niveauClasseSchema);
module.exports = niveauClasseSchema;
