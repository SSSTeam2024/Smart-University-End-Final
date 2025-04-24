const VoieEnvoiDao = require("../../dao/VoieEnvoiDao/VoieEnvoiDao");

const createVoieEnvoi = async (voieEnvoi) => {
  return await VoieEnvoiDao.createVoieEnvoi(voieEnvoi);
};

const updateVoieEnvoi = async (id, updateData) => {
  return await VoieEnvoiDao.updateVoieEnvoi(id, updateData);
};

const getAllVoieEnvoi = async () => {
  const result = await VoieEnvoiDao.getVoieEnvois();
  return result;
};

const deleteVoieEnvoi = async (id) => {
  return await VoieEnvoiDao.deleteVoieEnvoi(id);
};

module.exports = {
  createVoieEnvoi,
  updateVoieEnvoi,
  getAllVoieEnvoi,
  deleteVoieEnvoi,
};
