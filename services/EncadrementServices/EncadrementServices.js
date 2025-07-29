const EncadrementDao = require("../../dao/EncadrementDao/EncadrementDao");
const { getDb } = require("../../config/dbSwitcher");

const createEncadrement = async (encadrement, useNew) => {
  try {
    const db = await getDb(useNew);
    return await EncadrementDao.createEncadrement(encadrement, db);
  } catch (error) {
    console.error("Error creating encadrement in service:", error);
    throw error;
  }
};

const getAllEncadrements = async (useNew) => {
  try {
    const db = await getDb(useNew);
    return await EncadrementDao.getAllEncadrements(db);
  } catch (error) {
    console.error("Error fetching all encadrements:", error);
    throw error;
  }
};

const getEncadrementById = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await EncadrementDao.getEncadrementById(id, db);
  } catch (error) {
    console.error("Error fetching encadrement by ID:", error);
    throw error;
  }
};

const updateEncadrement = async (id, updateData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await EncadrementDao.updateEncadrement(id, updateData, db);
  } catch (error) {
    console.error("Error updating encadrement:", error);
    throw error;
  }
};

const deleteEncadrement = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await EncadrementDao.deleteEncadrement(id, db);
  } catch (error) {
    console.error("Error deleting encadrement:", error);
    throw error;
  }
};

const deleteManyEncadrements = async (ids, useNew) => {
  try {
    const db = await getDb(useNew);
    return await EncadrementDao.deleteManyEncadrements(ids, db);
  } catch (error) {
    console.error("Error deleting many encadrements:", error);
    throw error;
  }
};
const getGroupedEncadrementsByEnseignant = async (enseignantId, useNewDb) => {
  const db = await getDb(useNewDb);
  return await EncadrementDao.getGroupedEncadrementsByEnseignant(enseignantId, db);
};

module.exports = {
  createEncadrement,
  getAllEncadrements,
  getEncadrementById,
  updateEncadrement,
  deleteEncadrement,
  deleteManyEncadrements,
  getGroupedEncadrementsByEnseignant
};
