const VoieEnvoiDao = require("../../dao/VoieEnvoiDao/VoieEnvoiDao");
const { getDb } = require("../../config/dbSwitcher");

const createVoieEnvoi = async (voieEnvoi, useNew) => {
  const db = await getDb(useNew);
  return await VoieEnvoiDao.createVoieEnvoi(voieEnvoi, db);
};

const updateVoieEnvoi = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await VoieEnvoiDao.updateVoieEnvoi(id, updateData, db);
};

const getAllVoieEnvoi = async (useNew) => {
  const db = await getDb(useNew);
  const result = await VoieEnvoiDao.getVoieEnvois(db);
  return result;
};

const deleteVoieEnvoi = async (id, useNew) => {
  const db = await getDb(useNew);
  return await VoieEnvoiDao.deleteVoieEnvoi(id, db);
};

module.exports = {
  createVoieEnvoi,
  updateVoieEnvoi,
  getAllVoieEnvoi,
  deleteVoieEnvoi,
};
