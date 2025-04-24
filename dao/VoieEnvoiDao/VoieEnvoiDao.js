const VoieEnvoi = require("../../model/VoieEnvoiModel/VoieEnvoiModel");

const createVoieEnvoi = async (voieEnvoi) => {
  return await VoieEnvoi.create(voieEnvoi);
};

const getVoieEnvois = async () => {
  return await VoieEnvoi.find();
};

const updateVoieEnvoi = async (id, updateData) => {
  return await VoieEnvoi.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteVoieEnvoi = async (id) => {
  return await VoieEnvoi.findByIdAndDelete(id);
};

module.exports = {
  createVoieEnvoi,
  getVoieEnvois,
  updateVoieEnvoi,
  deleteVoieEnvoi,
};
