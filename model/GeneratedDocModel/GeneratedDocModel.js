const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneratedDocModelSchema = new Schema(
  {
    personnel: { type: Schema.Types.ObjectId, ref: "Personnel", default: null },
    etudiant: { type: Schema.Types.ObjectId, ref: "Etudiant", default: null },
    enseignant: {
      type: Schema.Types.ObjectId,
      ref: "Enseignant",
      default: null,
    },
    model: { type: Schema.Types.ObjectId, ref: "TemplateBody" },
    doc: String,
    date_generation: String,
    num_ordre: String,
    num_qr_code: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('GeneratedDocModel', GeneratedDocModelSchema);
module.exports = GeneratedDocModelSchema;
