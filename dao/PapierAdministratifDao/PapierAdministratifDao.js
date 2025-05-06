const papierAdministratifSchema = require("../../model/PapierAdministratif/PapierAdministratifModel");

function getPapierAdministratifModel(dbConnection) {
  return (
    dbConnection.models.PapierAdministratif ||
    dbConnection.model("PapierAdministratif", papierAdministratifSchema)
  );
}

const addPapierAdministratif = async (papier_administratif, dbName) => {
  try {
    const PapierAdministratif = await getPapierAdministratifModel(dbName);
    const papier = await PapierAdministratif.create(papier_administratif);
    return papier;
  } catch (error) {
    throw new Error(`Error adding PapierAdministratif: ${error.message}`);
  }
};

const getPapierAdministratifs = async (dbName) => {
  const PapierAdministratif = await getPapierAdministratifModel(dbName);
  const result = await PapierAdministratif.find();
  return result;
};

const updatePapierAdministratif = async (id, updateData, dbName) => {
  const PapierAdministratif = await getPapierAdministratifModel(dbName);
  return await PapierAdministratif.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deletePapierAdministratif = async (id, dbName) => {
  const PapierAdministratif = await getPapierAdministratifModel(dbName);
  return await PapierAdministratif.findByIdAndDelete(id);
};

const getPapierAdministratifById = async (id, dbName) => {
  const PapierAdministratif = await getPapierAdministratifModel(dbName);
  return await PapierAdministratif.findById(id);
};

module.exports = {
  addPapierAdministratif,
  getPapierAdministratifById,
  deletePapierAdministratif,
  updatePapierAdministratif,
  getPapierAdministratifs,
};
