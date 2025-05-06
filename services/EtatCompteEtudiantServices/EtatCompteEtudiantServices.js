const etatEtudiantDao = require("../../dao/EtatCompteEtudiantDao/EtatCompteEtudiantDao");

const { getDb } = require("../../config/dbSwitcher");

const registerEtatEtudiantt = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await etatEtudiantDao.createEtatEtudiant(userData, db);
};

const updateEtatEtudiantDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await etatEtudiantDao.updateEtatEtudiant(id, updateData, db);
};

const getEtatEtudianttDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await etatEtudiantDao.getEtatEtudiantById(id, db);
};

const getEtatsEtudianttDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await etatEtudiantDao.getEtatsEtudiant(db);
  return result;
};

const deleteEtatEtudianttDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await etatEtudiantDao.deleteEtatEtudiant(id, db);
};

const getEtatCompteByValue = async ({ etat_ar, etat_fr }, useNew) => {
  const db = await getDb(useNew);
  return await etatEtudiantDao.getEtatByValue(etat_ar, etat_fr, db);
};
module.exports = {
  deleteEtatEtudianttDao,
  getEtatsEtudianttDao,
  getEtatEtudianttDaoById,
  registerEtatEtudiantt,
  updateEtatEtudiantDao,
  getEtatCompteByValue,
};
