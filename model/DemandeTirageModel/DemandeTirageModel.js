const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemandeTirageSchema = new Schema(
  {
    semestre: String,
    classes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: false,
      default: null,
    }],
    enseignant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      required: false,
      default: null,
    },
    matiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matiere",
      required: false,
      default: null,
    },
    file_document:String,
    titre: String,
    nbr_page:String,
    recto_verso: Boolean, 
    nbr_copies:String, // TODO: nbr etudiants + 10% du nombre total comme max
    format:String,
    date_envoi_demande:String,
    heure_envoi_demande:String,
    date_limite:String,
    heure_limite:String,
    date_recuperation:String,
    heure_recuperation:String,
    etat:String,
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    note:String,
    couleur:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemandeTirage", DemandeTirageSchema);
