const ReclamationSchema = require("../../model/ReclamationEtudiantModel/ReclamationEtudiantModel");

function getReclamationEtudiantModel(dbConnection) {
  return (
    dbConnection.models.Reclamation ||
    dbConnection.model("Reclamation", ReclamationSchema)
  );
}

const createReclamation = async (reclamationData, dbName) => {
  const Reclamation = await getReclamationEtudiantModel(dbName);
  const reclamation = new Reclamation(reclamationData);
  return reclamation.save();
};

const getAllReclamations = async (dbName) => {
  const Reclamation = await getReclamationEtudiantModel(dbName);
  return Reclamation.find().populate("studentId");
};

const getReclamationById = async (id, dbName) => {
  const Reclamation = await getReclamationEtudiantModel(dbName);
  return Reclamation.findById(id).populate("studentId");
};

const updateReclamation = async (id, updateData, dbName) => {
  const Reclamation = await getReclamationEtudiantModel(dbName);
  updateData.updatedAt = Date.now();

  return Reclamation.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("studentId")
    .exec();
};

const deleteReclamation = async (id, dbName) => {
  const Reclamation = await getReclamationEtudiantModel(dbName);
  return Reclamation.findByIdAndDelete(id).populate("studentId");
};

const deleteManyReclamationsEtudiants = async (dbName, ids) => {
  const reclamationEtudiantModel = await getReclamationEtudiantModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await reclamationEtudiantModel.deleteMany(query);
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation,
  deleteManyReclamationsEtudiants,
};
