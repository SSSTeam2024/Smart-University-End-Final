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
  file: String,
  status_history: [{
    value: String,
    date: String,
    time: String,
    handled_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }

  }],
  current_status: String, //rejetee, acceptee, en attente, generee
  generated_doc: { type: String, required: false, default: null },
  // extra_data: [{
  //   name: String,
  //   value: String,
  //   body: String

  // }],
  extra_data: [{
    name: String,
    value: String,   // will hold "congés de matérnité"
    body: String,
    filePath: String,         // ✅ optional field to store filename
    FileExtension: String,    // ✅ optional
    FileBase64: String        // ✅ optional (can be removed after saving)
  }]
  ,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

module.exports = DemandeEnseignantSchema;
