const matiereDao = require("../../dao/MatiereDao/MatiereDao");

const registerMatiere = async (userData) => {
  return await matiereDao.createMatiere(userData);
};

const updateMatiereDao = async (id, updateData) => {
  return await matiereDao.updateMatiere(id, updateData);
};

const getMatiereDaoById = async (id) => {
  return await matiereDao.getMatiereById(id);
};

const getMatieresDao = async () => {
  const result = await matiereDao.getMatieres();
  return result;
};

const deleteMatiereDao = async (id) => {
  return await matiereDao.deleteMatiere(id);
};

const getMatiereByCode = async ({ code_matiere }) => {
  return await matiereDao.getMatiereByCodeMatiere(code_matiere);
};

module.exports = {
  deleteMatiereDao,
  getMatieresDao,
  getMatiereDaoById,
  updateMatiereDao,
  registerMatiere,
  getMatiereByCode,
};
