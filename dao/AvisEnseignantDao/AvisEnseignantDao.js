const AvisEnseignantSchema = require("../../model/AvisEnseignant/AvisEnseignant");

function getAvisEnseignantModel(dbConnection) {
  return (
    dbConnection.models.AvisEnseignant ||
    dbConnection.model("AvisEnseignant", AvisEnseignantSchema)
  );
}

const createAvisEnseignant = async (avisEnseignantData, dbName) => {
  const AvisEnseignant = await getAvisEnseignantModel(dbName);
  const avisEnseignant = new AvisEnseignant(avisEnseignantData);
  return avisEnseignant.save();
};

const getAllAvisEnseignants = async (dbName) => {
  const AvisEnseignant = await getAvisEnseignantModel(dbName);
  return await AvisEnseignant.find();
};

const getAvisEnseignantById = async (id, dbName) => {
  const AvisEnseignant = await getAvisEnseignantModel(dbName);
  return AvisEnseignant.findById(id);
};

const updateAvisEnseignant = async (id, updateData, dbName) => {
  const AvisEnseignant = await getAvisEnseignantModel(dbName);
  return AvisEnseignant.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAvisEnseignant = async (id, dbName) => {
  const AvisEnseignant = await getAvisEnseignantModel(dbName);
  return AvisEnseignant.findByIdAndDelete(id);
};

const deleteAvisEnseignants = async (dbName, ids) => {
  const avisEnseignantModel = await getAvisEnseignantModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await avisEnseignantModel.deleteMany(query);
};

module.exports = {
  createAvisEnseignant,
  getAllAvisEnseignants,
  getAvisEnseignantById,
  updateAvisEnseignant,
  deleteAvisEnseignant,
  deleteAvisEnseignants,
};
