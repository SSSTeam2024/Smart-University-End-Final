const ActualiteSchema = require("../../model/ActualiteModel/ActualiteModel");

function getActualiteModel(dbConnection) {
  return (
    dbConnection.models.Actualite ||
    dbConnection.model("Actualite", ActualiteSchema)
  );
}

const getAllActualites = async (dbName) => {
  const Actualite = getActualiteModel(dbName);
  return await Actualite.find().populate("auteurId");
};

const createActualite = async (ActualiteData, dbName) => {
  const Actualite = getActualiteModel(dbName);
  const actualite = new Actualite(ActualiteData);
  return actualite.save();
};

const getActualiteById = async (id, dbName) => {
  const Actualite = getActualiteModel(dbName);
  return Actualite.findById(id).populate("auteurId");
};

const updateActualite = async (id, updateData, dbName) => {
  const Actualite = getActualiteModel(dbName);
  return Actualite.findByIdAndUpdate(id, updateData, { new: true }).populate(
    "auteurId"
  );
};

const deleteActualite = async (id, dbName) => {
  const Actualite = getActualiteModel(dbName);
  return Actualite.findByIdAndDelete(id);
};

const deleteManyActualites = async (dbName, ids) => {
  const actualiteModel = await getActualiteModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await actualiteModel.deleteMany(query);
};

module.exports = {
  createActualite,
  getAllActualites,
  getActualiteById,
  updateActualite,
  deleteActualite,
  deleteManyActualites,
};
