const specialiteEnseignant = require("../../model/SpecialiteEnseignantModel/SpecialiteEnseignantModel");

const createSpecialiteEnseignant = async (specialite_enseignant) => {
  return await specialiteEnseignant.create(specialite_enseignant);
};

const getSpecialitesEnseignant = async () => {
  const result = await specialiteEnseignant.find();
  return result;
};

const updateSpecialiteEnseignant = async (id, updateData) => {
  return await specialiteEnseignant.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteSpecialiteEnseignant = async (id) => {
  return await specialiteEnseignant.findByIdAndDelete(id);
};

const getSpecialiteEnseignantById = async (id) => {
  return await specialiteEnseignant.findById(id);
};
const getSpecialiteByValue = async (specialite_ar, specialite_fr) => {
  return await specialiteEnseignant.findOne({ specialite_ar, specialite_fr });
};

module.exports = {
  createSpecialiteEnseignant,
  getSpecialitesEnseignant,
  deleteSpecialiteEnseignant,
  getSpecialiteEnseignantById,
  updateSpecialiteEnseignant,
  getSpecialiteByValue,
};
