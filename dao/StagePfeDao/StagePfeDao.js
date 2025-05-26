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
  return await StagePfe.find()
    .populate("etudiant")
    .populate("binome")
    .populate("encadrant_univ")
    .populate("societe")
    .populate("rapporteur")
    .populate("chef_jury");
};

const updateStagePfe = async (id, updateData, dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteStagePfe = async (id, dbName) => {
  const StagePfe = await getStagePfeModel(dbName);
  return await StagePfe.findByIdAndDelete(id);
};

module.exports = {
  createStagePfe,
  getStagesPfe,
  updateStagePfe,
  deleteStagePfe,
};
