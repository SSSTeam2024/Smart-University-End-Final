const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemandePersonnelSchema = new Schema({
  personnelId: {
    type: Schema.Types.ObjectId,
    ref: "Personnel",
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
  generated_doc: { type: String, required: false },
  extra_data: [{
    name: String,
    value: String,
    body: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

module.exports = DemandePersonnelSchema;
