const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursEnseignantSchema = new Schema(
  {
    classe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classe",
        required: false,
        default: null,
      },
    ],
    enseignant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      required: false,
      default: null,
    },
    nom_cours: String,
    file_cours: [String],
    trimestre: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoursEnseignant", CoursEnseignantSchema);
