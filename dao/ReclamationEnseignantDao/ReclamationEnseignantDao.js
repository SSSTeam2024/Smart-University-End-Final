const ReclamationEnseignantSchema = require("../../model/ReclamationEnseignantModel/ReclamationEnseignantModel");

function getReclamationEnseignantModel(dbConnection) {
  return (
    dbConnection.models.ReclamationEnseignant ||
    dbConnection.model("ReclamationEnseignant", ReclamationEnseignantSchema)
  );
}

const createReclamation = async (reclamationData, dbName) => {
  const ReclamationEnseignant = await getReclamationEnseignantModel(dbName);
  const reclamation = new ReclamationEnseignant(reclamationData);
  return reclamation.save();
};

const getAllReclamations = async (dbName) => {
  const ReclamationEnseignant = await getReclamationEnseignantModel(dbName);
  return ReclamationEnseignant.find().populate("enseignantId");
};

const getReclamationById = async (id, dbName) => {
  const ReclamationEnseignant = await getReclamationEnseignantModel(dbName);
  return ReclamationEnseignant.findById(id).populate("enseignantId");
};

const updateReclamation = async (id, updateData, dbName) => {
  const ReclamationEnseignant = await getReclamationEnseignantModel(dbName);
  updateData.updatedAt = Date.now();

  return ReclamationEnseignant.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("enseignantId")
    .exec();
};

const deleteReclamation = async (id, dbName) => {
  const ReclamationEnseignant = await getReclamationEnseignantModel(dbName);
  return ReclamationEnseignant.findByIdAndDelete(id).populate("enseignantId");
};

const deleteManyReclamationEnseignant = async (dbName, ids) => {
  const reclamationEnseignantModel = await getReclamationEnseignantModel(
    dbName
  );
  const query = {
    _id: { $in: ids },
  };
  return await reclamationEnseignantModel.deleteMany(query);
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation,
  deleteManyReclamationEnseignant,
};
