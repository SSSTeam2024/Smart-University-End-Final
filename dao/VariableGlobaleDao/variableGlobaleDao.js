const variableGlobaleSchema = require("../../model/VariableGlobaleModel/variableGlobaleModel");

function getVariableGlobaleModel(dbConnection) {
  return (
    dbConnection.models.VariableGlobale ||
    dbConnection.model("VariableGlobale", variableGlobaleSchema)
  );
}

const createVariableGlobale = async (VariableData, dbName) => {
  const VariableGlobale = await getVariableGlobaleModel(dbName);
  return await VariableGlobale.create(VariableData);
};

const getVariableGlobales = async (dbName) => {
  const VariableGlobale = await getVariableGlobaleModel(dbName);
  return await VariableGlobale.find();
};

const getVariableGlobaleById = async (id, dbName) => {
  const VariableGlobale = await getVariableGlobaleModel(dbName);
  return await VariableGlobale.findById(id);
};

module.exports = {
  createVariableGlobale,
  getVariableGlobales,
  getVariableGlobaleById,
};
