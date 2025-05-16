const DeplacementSchema = require("../../model/Deplacement/Deplacement");

function getDeplacementModel(dbConnection) {
  return (
    dbConnection.models.Deplacement ||
    dbConnection.model("Deplacement", DeplacementSchema)
  );
}

const createDeplacement = async (deplacementData, dbName) => {
  const Deplacement = await getDeplacementModel(dbName);
  const deplacement = new Deplacement(deplacementData);
  return deplacement.save();
};

const getAllDeplacements = async (dbName) => {
  const Deplacement = await getDeplacementModel(dbName);
  return Deplacement.find().populate("personnel").populate("enseignant");
};

const getDeplacementById = async (id, dbName) => {
  const Deplacement = await getDeplacementModel(dbName);
  return Deplacement.findById(id);
};

const updateDeplacement = async (id, updateData, dbName) => {
  const Deplacement = await getDeplacementModel(dbName);
  return Deplacement.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteDeplacement = async (id, dbName) => {
  const Deplacement = await getDeplacementModel(dbName);
  return Deplacement.findByIdAndDelete(id);
};

const deleteManyDeplacements = async (dbName, ids) => {
  const deplacementModel = await getDeplacementModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await deplacementModel.deleteMany(query);
};

const getDeplacementByPersonnelId = async (id, dbName) => {
  try {
    const deplacementModel = await getDeplacementModel(dbName);
    const deplacements = await deplacementModel.find({
      personnel: id,
    });
    return deplacements;
  } catch (error) {
    console.error("Error while getting deplacements by personnel id in Dao ");
    throw error;
  }
};

module.exports = {
  createDeplacement,
  getAllDeplacements,
  getDeplacementById,
  updateDeplacement,
  deleteDeplacement,
  deleteManyDeplacements,
  getDeplacementByPersonnelId,
};
