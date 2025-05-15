const mongoose = require("mongoose");

const stagePfeSchema = new mongoose.Schema(
  {
    etudiant: String,
    type_stage: String,
    binome: String,
    encadrant_univ: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departement",
    },
    encadrant_societe: String,
    societe: String,
    status_stage: String,
    date_debut: String,
    date_fin: String,
    date_soutenance: String,
    sujet: String,
    description: String,
    avis: String,
    note: String,
    rapporteur: String,
    chef_jury: String,
  },
  { timestamps: true }
);

module.exports = stagePfeSchema;
