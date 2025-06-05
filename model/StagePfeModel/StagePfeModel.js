const mongoose = require("mongoose");

const stagePfeSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etudiant",
    },
    type_stage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeStage",
      default: null,
    },
    binome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etudiant",
      default: null,
    },
    encadrant_univ1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    encadrant_univ2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    encadrant_societe1: String,
    encadrant_societe2: String,
    societe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Societe",
      efault: null,
    },
    //! Stage
    status_stage: String,
    date_debut: String,
    date_fin: String,
    sujet: String,
    description: String,
    mot_cle: String,
    biblio: String,
    //! Soutenance
    date_soutenance: String,
    heure_debut: String,
    heure_fin: String,
    salle: String,
    avancement: String,
    avis: String,
    mention: String,
    remarque: String,
    note: String,
    rapporteur1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    rapporteur2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    examinateur1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    examinateur2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    invite1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    invite2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    chef_jury: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      efault: null,
    },
    file_affectation_etudiant: String,
    file_affectation_binome: String,
    file_proposition: String,
    file_proposition_signe: String,
    file_attestation: String,
    file_rapport: String,
  },
  { timestamps: true }
);

module.exports = stagePfeSchema;
