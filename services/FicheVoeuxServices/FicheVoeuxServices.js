const ficheVoeuxDao = require("../../dao/FicheVoeuxDao/FicheVoeuxDao");
const { getDb } = require("../../config/dbSwitcher");
const createficheVoeux = async (data, useNew) => {
  try {
    const db = await getDb(useNew);
    return await ficheVoeuxDao.createficheVoeux(data, db);
  } catch (error) {
    console.error("Error in fiche de voeux service:", error);
    throw error;
  }
};

const updateFicheVoeux = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await ficheVoeuxDao.updateFicheVoeux(id, updateData, db);
};

const getFichesVoeux = async (useNew) => {
  const db = await getDb(useNew);
  const result = await ficheVoeuxDao.getFichesVoeux(db);
  return result;
};

const deleteFicheVoeuxById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await ficheVoeuxDao.deleteFicheVoeuxById(id, db);
};

module.exports = {
  createficheVoeux,
  getFichesVoeux,
  deleteFicheVoeuxById,
  updateFicheVoeux,
};
