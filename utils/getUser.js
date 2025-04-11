const Etudiant = require ("../model/EtudiantModel/EtudiantModel.js") ;
const Enseignant = require ( "../model/EnseignantModel/EnseignantModel.js");
const Personnel= require ( "../model/PersonnelModel/PersonnelModel.js");
const User= require ( "../model/userModel/userModel.js");
const models = { Etudiant, Enseignant, Personnel, User };

const getUserById = async (id, userType) => {
  const model = models[userType];
  if (!model) throw new Error(`Invalid user type: ${userType}`);
  return await model.findById(id).select("nom_fr prenom_fr email");
};
module.exports = {
    getUserById
};