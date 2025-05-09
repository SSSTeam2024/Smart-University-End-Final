const departementSchema = require("../../model/departementModel/DepartementModel");
const salleSchema = require("../../model/SallesModel/SallesModel");

function getDepartementModel(dbConnection) {
  return (
    dbConnection.models.Departement ||
    dbConnection.model("Departement", departementSchema)
  );
}

function getSalleModel(dbConnection) {
  return dbConnection.models.Salle || dbConnection.model("Salle", salleSchema);
}

const createSalle = async (salle, dbName) => {
  const salleModel = await getSalleModel(dbName);
  return await salleModel.create(salle);
};

const getSalles = async (dbName) => {
  const salleModel = await getSalleModel(dbName);
  return await salleModel.find().populate("departement");
};

const updateSalle = async (id, updateData, dbName) => {
  const salleModel = await getSalleModel(dbName);
  return await salleModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSalle = async (id, dbName) => {
  const salleModel = await getSalleModel(dbName);
  const DepartementModel = await getDepartementModel(dbName);
  const deletedSalle = await salleModel.findByIdAndDelete(id);
  if (deletedSalle) {
    await DepartementModel.updateMany(
      { salles: id },
      { $pull: { salles: id } }
    );
  }
  return deletedSalle;
};
const getSalleById = async (id, dbName) => {
  const salleModel = await getSalleModel(dbName);
  return await salleModel.findById(id).populate("departement");
};

module.exports = {
  getSalles,
  createSalle,
  updateSalle,
  deleteSalle,
  getSalleById,
};
