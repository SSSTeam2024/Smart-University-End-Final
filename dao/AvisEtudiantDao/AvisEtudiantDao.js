const AvisEtudiantSchema = require("../../model/AvisEtudiant/AvisEtudiantModel");

function getAvisEtudiantModel(dbConnection) {
  return (
    dbConnection.models.AvisEtudiant ||
    dbConnection.model("AvisEtudiant", AvisEtudiantSchema)
  );
}

const createAvisEtudiant = async (avisEtudiantData, dbName) => {
  const avisEtudiantModel = await getAvisEtudiantModel(dbName);
  const avisEtudiant = new avisEtudiantModel(avisEtudiantData);
  return avisEtudiant.save();
};

const getAllAvisEtudiants = async (dbName) => {
  const avisEtudiants = await getAvisEtudiantModel(dbName);
  return await avisEtudiants
    .find()
    .populate("groupe_classe")
    .populate("auteurId");
};

const getAvisEtudiantById = async (id, dbName) => {
  const avisEtudiantModel = await getAvisEtudiantModel(dbName);
  return avisEtudiantModel.findById(id).populate("groupe_classe");
};

const updateAvisEtudiant = async (id, updateData, dbName) => {
  const avisEtudiantModel = await getAvisEtudiantModel(dbName);
  return avisEtudiantModel.findByIdAndUpdate(id, updateData, { new: true }).populate(
    "groupe_classe"
  );
};

const deleteAvisEtudiant = async (id, dbName) => {
  const avisEtudiantModel = await getAvisEtudiantModel(dbName);
  return avisEtudiantModel.findByIdAndDelete(id);
};

const deleteAvisEtudiants = async (dbName, ids) => {
  const avisEtudiantModel = await getAvisEtudiantModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await avisEtudiantModel.deleteMany(query);
};

module.exports = {
  createAvisEtudiant,
  getAllAvisEtudiants,
  getAvisEtudiantById,
  updateAvisEtudiant,
  deleteAvisEtudiant,
  deleteAvisEtudiants,
};
