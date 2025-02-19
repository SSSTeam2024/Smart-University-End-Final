const posteEnseignant = require("../../model/PosteEnseignantModel/PosteEnseignantModel");

const createPosteEnseignant = async (poste_enseignant) => {
  return await posteEnseignant.create(poste_enseignant);
};

const getPostesEnseignant = async () => {
  return await posteEnseignant.find();
};

const updatePosteEnseignant = async (id, updateData) => {
  return await posteEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePosteEnseignant = async (id) => {
  return await posteEnseignant.findByIdAndDelete(id);
};

const getPosteEnseignantById = async (id) => {
  return await posteEnseignant.findById(id);
};

const getPosteByValue = async (poste_ar, poste_fr) => {
  return await posteEnseignant.findOne({ poste_ar, poste_fr });
};
module.exports = {
  createPosteEnseignant,
  getPostesEnseignant,
  updatePosteEnseignant,
  deletePosteEnseignant,
  getPosteEnseignantById,
  getPosteByValue,
};
