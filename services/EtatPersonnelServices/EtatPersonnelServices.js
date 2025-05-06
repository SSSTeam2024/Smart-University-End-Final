const EtatPersonnelDao = require("../../dao/EtatPersonnelDao/EtatPersonnelDao");
const { getDb } = require("../../config/dbSwitcher");

const registerEtatPersonnel = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await EtatPersonnelDao.createEtatPersonnel(userData, db);
};

const updateEtatPersonnelDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await EtatPersonnelDao.updateEtatPersonnel(id, updateData, db);
};

const getEtatPersonnelDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await EtatPersonnelDao.getEtatPersonnelById(id, db);
};

const getEtatsPersonnelDao = async (useNew) => {
  const db = await getDb(useNew);
  return await EtatPersonnelDao.getEtatsPersonnel(db);
};

const getEtatByValue = async ({ etat_ar, etat_fr }, useNew) => {
  const db = await getDb(useNew);
  return await EtatPersonnelDao.getEtatByValue(etat_ar, etat_fr, db);
};

const deleteEtatPersonnelDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await EtatPersonnelDao.deleteEtatPersonnel(id, db);
};

module.exports = {
  registerEtatPersonnel,
  deleteEtatPersonnelDao,
  getEtatsPersonnelDao,
  getEtatPersonnelDaoById,
  updateEtatPersonnelDao,
  getEtatByValue,
};
