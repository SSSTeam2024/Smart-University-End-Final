const mongoose = require("mongoose");

const encadrementSchema = new mongoose.Schema(
  {
    enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enseignant',
    required: true,
  },
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etudiant',
    required: true,
  },
  stage: {
     type: mongoose.Schema.Types.ObjectId,
    ref: 'StagePfe',
    required: true,
  },
  seance: {
    type: String,
    required: true,
  },
  avancement: {
    type: String,
    required: false,
  },
  remarque: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  heure_debut: {
    type: String,
    required: true,
  },
  heure_fin: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ['Présentiel', 'En ligne'],
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = encadrementSchema;
