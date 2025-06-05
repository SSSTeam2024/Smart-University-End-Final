const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemandeEnseignantSchema = new Schema({
  enseignantId: {
    type: Schema.Types.ObjectId,
    ref: "Enseignant",
    required: true,
  },
  title: { type: String, required: false },
  description: { type: String, required: false },
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
  },
  generated_doc: { type: String, required: false, default: null },
  extra_data: [{
    name: String,
    value: String,
    body: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = DemandeEnseignantSchema;
