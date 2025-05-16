const mongoose = require("mongoose");

const stagePfeSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
    },
    type_stage: String,
    binome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      default: null,
    },
    encadrant_univ: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    encadrant_societe: String,
    societe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Societe",
      efault: null,
    },
    status_stage: String,
    date_debut: String,
    date_fin: String,
    date_soutenance: String,
    sujet: String,
    description: String,
    avis: String,
    note: String,
    rapporteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    chef_jury: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
  },
  { timestamps: true }
);

module.exports = stagePfeSchema;
