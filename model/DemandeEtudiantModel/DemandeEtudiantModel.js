const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemandeEtudiantSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Etudiant", required: true },
  title: { type: String, required: false },
  description: { type: String },
  piece_demande: {
    type: Schema.Types.ObjectId,
    ref: "TemplateBody",
    required: false,
    default: null,
  },
  langue: { type: String, required: false },
  nombre_copie: { type: Number, required: false },
  response: { type: String, required: false },
  status: {
    type: String,
    enum: ["en attente", "traité", "rejeté"],
    default: "en attente",
  }, //TODO: Add new status : notifié
  generated_doc: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = DemandeEtudiantSchema;
