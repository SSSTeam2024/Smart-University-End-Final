const voieEnvoiSchema = require("../../model/VoieEnvoiModel/VoieEnvoiModel");

function getVoieEnvoiModel(dbConnection) {
  return (
    dbConnection.models.VoieEnvoi ||
    dbConnection.model("VoieEnvoi", voieEnvoiSchema)
  );
}

const createVoieEnvoi = async (voieEnvoi, dbName) => {
  const VoieEnvoi = await getVoieEnvoiModel(dbName);
  return await VoieEnvoi.create(voieEnvoi);
};

const getVoieEnvois = async (dbName) => {
  const VoieEnvoi = await getVoieEnvoiModel(dbName);
  return await VoieEnvoi.find();
};

const updateVoieEnvoi = async (id, updateData, dbName) => {
  const VoieEnvoi = await getVoieEnvoiModel(dbName);
  return await VoieEnvoi.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteVoieEnvoi = async (id, dbName) => {
  const VoieEnvoi = await getVoieEnvoiModel(dbName);
  return await VoieEnvoi.findByIdAndDelete(id);
};

module.exports = {
  createVoieEnvoi,
  getVoieEnvois,
  updateVoieEnvoi,
  deleteVoieEnvoi,
};
