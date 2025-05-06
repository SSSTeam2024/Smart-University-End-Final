const EtatEnseignantDao = require("../../dao/EtatCompteEnseignantDao/EtatCompteEnseignantDao");
const { getDb } = require("../../config/dbSwitcher");

const registerEtatEnseignant = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await EtatEnseignantDao.createEtatEnseignant(userData, db);
};

const updateEtatEnseignantDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await EtatEnseignantDao.updateEtatEnseignant(id, updateData, db);
};

const getEtatEnseignantDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await EtatEnseignantDao.getEtatEnseignantById(id, db);
};

const getEtatsEnseignantDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await EtatEnseignantDao.getEtatsEnseignant(db);
  return result;
};

const deleteEtatEnseignantDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await EtatEnseignantDao.deleteEtatEnseignant(id, db);
};

const getEtatCompteByValue = async ({ etat_ar, etat_fr }, useNew) => {
  const db = await getDb(useNew);
  return await EtatEnseignantDao.getEtatByValue(etat_ar, etat_f, dbr);
};

module.exports = {
  registerEtatEnseignant,
  deleteEtatEnseignantDao,
  getEtatsEnseignantDao,
  getEtatEnseignantDaoById,
  updateEtatEnseignantDao,
  getEtatCompteByValue,
};
