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

const getReclamationsByPersonnelId = async (id, dbName) => {
  try {
    const reclamationPersonnelModel = await getReclamationPersonnelModel(
      dbName
    );
    const reclamations = await reclamationPersonnelModel.find({
      personnelId: id,
    });
    return reclamations;
  } catch (error) {
    console.error("Error while getting reclamations by personnel id in Dao ");
    throw error;
  }
};

module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateReclamation,
  deleteReclamation,
  deleteManyReclamationPersonnel,
  getReclamationsByPersonnelId,
};
