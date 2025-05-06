const mongoose = require("mongoose");

const categoriePersonnelSchema = new mongoose.Schema(
  {
    categorie_ar: String,
    categorie_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('CategoriePersonnel', categoriePersonnelSchema);
module.exports = categoriePersonnelSchema;
