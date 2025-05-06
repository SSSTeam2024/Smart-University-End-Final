const matiereDao = require("../../dao/MatiereDao/MatiereDao");
const { getDb } = require("../../config/dbSwitcher");

const registerMatiere = async (matiereData, useNew) => {
  const db = await getDb(useNew);
  return await matiereDao.createMatiere(matiereData, db);
};

const updateMatiereDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await matiereDao.updateMatiere(id, updateData, db);
};

const getMatiereDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await matiereDao.getMatiereById(id, db);
};

const getMatieresDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await matiereDao.getMatieres(db);
  return result;
};

const deleteMatiereDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await matiereDao.deleteMatiere(id, db);
};

const getMatiereByCode = async ({ code_matiere }, useNew) => {
  const db = await getDb(useNew);
  return await matiereDao.getMatiereByCodeMatiere(code_matiere, db);
};

module.exports = {
  deleteMatiereDao,
  getMatieresDao,
  getMatiereDaoById,
  updateMatiereDao,
  registerMatiere,
  getMatiereByCode,
};
