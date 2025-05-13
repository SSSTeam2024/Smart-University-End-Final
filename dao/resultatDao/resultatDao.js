const resultatSchema = require("../../model/ResultatModel/ResultatModel");

function getResultatModel(dbConnection) {
  return (
    dbConnection.models.Resultat ||
    dbConnection.model("Resultat", resultatSchema)
  );
}

const createResultat = async (resultat, dbName) => {
  const resultatModel = await getResultatModel(dbName);
  return await resultatModel.create(resultat);
};

const getResultat = async (dbName) => {
  const resultatModel = await getResultatModel(dbName);
  return await resultatModel.find().populate({
    path: "etudiants",
    populate: { path: "etudiant" },
  });
};

const updateResultat = async (id, updateData, dbName) => {
  const resultatModel = await getResultatModel(dbName);
  return await resultatModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteResultat = async (id, dbName) => {
  const resultatModel = await getResultatModel(dbName);
  const deletedResultat = await resultatModel.findByIdAndDelete(id);

  return deletedResultat;
};

const getResultatById = async (id, dbName) => {
  const resultatModel = await getResultatModel(dbName);
  return await resultatModel.findById(id).populate({
    path: "etudiants",
    populate: { path: "etudiant" },
  });
};

module.exports = {
  getResultat,
  createResultat,
  deleteResultat,
  updateResultat,
  getResultatById,
};
