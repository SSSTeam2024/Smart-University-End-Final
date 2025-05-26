const stageProSchema = require("../../model/StageProModel/StageProModel");

function getStageProModel(dbConnection) {
  return (
    dbConnection.models.StagePro ||
    dbConnection.model("StagePro", stageProSchema)
  );
}

const createStagePro = async (stagePro, dbName) => {
  const StagePro = await getStageProModel(dbName);
  return await StagePro.create(stagePro);
};

const getStagesPro = async (dbName) => {
  const StagePro = await getStageProModel(dbName);
  return await StagePro.find()
    .populate("etudiant")
    .populate("binome")
    .populate("encadrant_univ")
    .populate("societe")
    .populate("rapporteur")
    .populate("chef_jury");
};

const updateStagePro = async (id, updateData, dbName) => {
  const StagePro = await getStageProModel(dbName);
  return await StagePro.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteStagePro = async (id, dbName) => {
  const StagePro = await getStageProModel(dbName);
  return await StagePro.findByIdAndDelete(id);
};

module.exports = {
  createStagePro,
  getStagesPro,
  updateStagePro,
  deleteStagePro,
};
