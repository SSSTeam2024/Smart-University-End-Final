const posteEnseignantDao = require("../../dao/PosteEnseignantDao/PosteEnseignantDao");
const { getDb } = require("../../config/dbSwitcher");

const createPosteEnseignant = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await posteEnseignantDao.createPosteEnseignant(userData, db);
};

const updatePosteEnseignantDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await posteEnseignantDao.updatePosteEnseignant(id, updateData, db);
};

const getPosteEnseignantDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await posteEnseignantDao.getPosteEnseignantById(id, db);
};

const getPostesEnseignantDao = async (useNew) => {
  const db = await getDb(useNew);
  return await posteEnseignantDao.getPostesEnseignant(db);
};

const deletePosteEnseignantDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await posteEnseignantDao.deletePosteEnseignant(id, db);
};
const getPosteByValue = async ({ poste_ar, poste_fr }, useNew) => {
  const db = await getDb(useNew);
  return await posteEnseignantDao.getPosteByValue(poste_ar, poste_fr, db);
};

module.exports = {
  deletePosteEnseignantDao,
  getPostesEnseignantDao,
  getPosteEnseignantDaoById,
  updatePosteEnseignantDao,
  createPosteEnseignant,
  getPosteByValue,
};
