const mongoose = require("mongoose");

const postePersonnelSchema = new mongoose.Schema(
  {
    poste_ar: String,
    poste_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('PostePersonnel', postePersonnelSchema);
module.exports = postePersonnelSchema;
