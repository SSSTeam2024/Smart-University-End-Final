const mongoose = require("mongoose");

const pointageEnseignantSchema = new mongoose.Schema(
  {
    id_enseignant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      required: true,
    },
    id_seance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seance",
      required: true,
    },
    date_pointage: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model("PointageEnseignant", pointageEnseignantSchema);
module.exports = pointageEnseignantSchema;
