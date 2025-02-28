const DomaineClasse = require("../../model/DomaineClasseModel/DomaineClasseModel");

const createDomaineClasse = async (domaine) => {
  try {
    return await DomaineClasse.create(domaine);
  } catch (error) {
    throw error;
  }
};

const getDomainesClasse = async () => {
  try {
    return await DomaineClasse.find();
  } catch (error) {
    console.error("Error fetching domaine classe:", error);
    throw error;
  }
};
const updateDomaineClasse = async (id, updateData) => {
  try {
    return await DomaineClasse.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating domaine classe:", error);
    throw error;
  }
};

const deleteDomaineClasse = async (id) => {
  return await DomaineClasse.findByIdAndDelete(id);
};

const getDomaineByValue = async (name_domaine_ar, name_domaine_fr) => {
  return await DomaineClasse.findOne({ name_domaine_ar, name_domaine_fr });
};

module.exports = {
  deleteDomaineClasse,
  updateDomaineClasse,
  getDomainesClasse,
  createDomaineClasse,
  getDomaineByValue,
};
