const ReclamationPersonnelSchema = require("../../model/ReclamationPersonnelModel/ReclamationPersonnelModel");

function getReclamationPersonnelModel(dbConnection) {
  return (
    dbConnection.models.ReclamationPersonnel ||
    dbConnection.model("ReclamationPersonnel", ReclamationPersonnelSchema)
  );
}

const createReclamation = async (reclamationData, dbName) => {
  const Reclamation = await getReclamationPersonnelModel(dbName);
  const reclamation = new Reclamation(reclamationData);
  return reclamation.save();
};

const getAllReclamations = async (dbName) => {
  const reclamationPersonnelModel = await getReclamationPersonnelModel(dbName);
  return await reclamationPersonnelModel.find().populate("personnelId");
};

const getReclamationById = async (id, dbName) => {
  const Reclamation = await getReclamationPersonnelModel(dbName);
  return Reclamation.findById(id).populate("personnelId");
};

const updateReclamation = async (id, updateData, dbName) => {
  updateData.updatedAt = Date.now();
  const Reclamation = await getReclamationPersonnelModel(dbName);
  return Reclamation.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("personnelId")
    .exec();
};

const deleteReclamation = async (id, dbName) => {
  const Reclamation = await getReclamationPersonnelModel(dbName);
  return Reclamation.findByIdAndDelete(id).populate("personnelId");
};

const deleteManyReclamationPersonnel = async (dbName, ids) => {
  const reclamationPersonnelModel = await getReclamationPersonnelModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await reclamationPersonnelModel.deleteMany(query);
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation,
  deleteManyReclamationPersonnel,
};
