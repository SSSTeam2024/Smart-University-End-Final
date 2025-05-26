const resultatDao = require("../../dao/resultatDao/resultatDao");

const { getDb } = require("../../config/dbSwitcher");

const createResultat = async (resultatData, useNew) => {
  try {
    const db = await getDb(useNew);
    const resultat = await resultatDao.createResultat(resultatData, db);
    return await resultat;
  } catch (error) {
    console.error("Error in salle service:", error);
    throw error;
  }
};

const getResultats = async (useNew) => {
  const db = await getDb(useNew);
  const resultats = await resultatDao.getResultat(db);
  return resultats;
};

const updateResultat = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await resultatDao.updateResultat(id, updateData, db);
};

const deleteResultatById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await resultatDao.deleteResultat(id, db);
};

const getResultatById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await resultatDao.getResultatById(id, db);
};

module.exports = {
  getResultats,
  createResultat,
  deleteResultatById,
  updateResultat,
  getResultatById,
};
