const demandeEnseignantDao = require("../../dao/DemandeEnseignantDao/DemandeEnseignantDao");

const { getDb } = require("../../config/dbSwitcher");

const createDemandeEnseignant = async (demandeEnseignantData, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.createDemandeEnseignant(
    demandeEnseignantData,
    db
  );
};

const getAllDemandeEnseignants = async (useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.getAllDemandeEnseignants(db);
};

const getDemandeEnseignantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.getDemandeEnseignantById(id, db);
};

const updateDemandeEnseignant = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.updateDemandeEnseignant(id, updateData, db);
};

const deleteDemandeEnseignant = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandeEnseignantDao.deleteDemandeEnseignant(id, db);
};
const getDemandesByTeacherId = async (enseignantId, useNew) => {
  const db = await getDb(useNew);
  return await demandeEnseignantDao.getDemandesByTeacherId(enseignantId, db);
};

const deleteManyDemandeEnseignant = async (useNew, ids) => {
  const db = await getDb(useNew);
  return await demandeEnseignantDao.deleteManyDemandeEnseignants(db, ids);
};

module.exports = {
  createDemandeEnseignant,
  getAllDemandeEnseignants,
  getDemandeEnseignantById,
  updateDemandeEnseignant,
  deleteDemandeEnseignant,
  getDemandesByTeacherId,
  deleteManyDemandeEnseignant,
};
