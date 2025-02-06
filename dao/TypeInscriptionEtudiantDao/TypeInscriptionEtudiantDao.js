const typeInscriptionEtudiant = require("../../model/TypeInscriptionEtudiantModel/TypeInscriptionEtudiantModel");

const createTypeInscriptionEtudiant = async (type_inscrit) => {
  return await typeInscriptionEtudiant.create(type_inscrit);
};

const getTypeInscriptionsEtudiant = async () => {
  const result = await typeInscriptionEtudiant.find();
  return result;
};

const updateTypeInscriptionEtudiant = async (id, updateData) => {
  return await typeInscriptionEtudiant.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteTypeInscriptionEtudiant = async (id) => {
  return await typeInscriptionEtudiant.findByIdAndDelete(id);
};

const getTypeInscriptionEtudiantById = async (id) => {
  return await typeInscriptionEtudiant.findById(id);
};

const getTypeInscriptionByValue = async (type_ar, type_fr) => {
  return await typeInscriptionEtudiant.findOne({ type_ar, type_fr });
};
module.exports = {
  getTypeInscriptionEtudiantById,
  deleteTypeInscriptionEtudiant,
  updateTypeInscriptionEtudiant,
  getTypeInscriptionsEtudiant,
  createTypeInscriptionEtudiant,
  getTypeInscriptionByValue,
};
