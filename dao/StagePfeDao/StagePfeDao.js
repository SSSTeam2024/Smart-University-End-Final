const stagePfeSchema = require("../../model/StagePfeModel/StagePfeModel");

function getStagePfeModel(dbConnection) {
  return (
    dbConnection.models.StagePfe ||
    dbConnection.model("StagePfe", stagePfeSchema)
  );
}

const createStagePfe = async (stagePfe, dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.create(stagePfe);
};

const getStagesPfe = async (dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.find();
};

// const updateVoieEnvoi = async (id, updateData, dbName) => {
//   const VoieEnvoi = await getVoieEnvoiModel(dbName);
//   return await VoieEnvoi.findByIdAndUpdate(id, updateData, { new: true });
// };

// const deleteVoieEnvoi = async (id, dbName) => {
//   const VoieEnvoi = await getVoieEnvoiModel(dbName);
//   return await VoieEnvoi.findByIdAndDelete(id);
// };

module.exports = {
  createStagePfe,
  getStagesPfe,
  //   updateVoieEnvoi,
  //   deleteVoieEnvoi,
};
