const demandePersonnelDao = require("../../dao/DemandePersonnelDao/DemandePersonnelDao");

const { getDb } = require("../../config/dbSwitcher");

const createDemandePersonnel = async (demandePersonnelData, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.createDemandePersonnel(demandePersonnelData, db);
};

const getAllDemandePersonnels = async (useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.getAllDemandePersonnels(db);
};

const getDemandePersonnelById = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.getDemandePersonnelById(id, db);
};

const updateDemandePersonnel = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.updateDemandePersonnel(id, updateData, db);
};

const deleteDemandePersonnel = async (id, useNew) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.deleteDemandePersonnel(id, db);
};

const deleteManyDemandePersonnel = async (useNew, ids) => {
  const db = await getDb(useNew);
  return demandePersonnelDao.deleteManyDemandePersonnel(db, ids);
};

module.exports = {
  createDemandePersonnel,
  getAllDemandePersonnels,
  getDemandePersonnelById,
  updateDemandePersonnel,
  deleteDemandePersonnel,
  deleteManyDemandePersonnel,
};
