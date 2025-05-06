const AvisPersonnelSchema = require("../../model/AvisPersonnel/AvisPersonnel");

function getAvisPersonnelModel(dbConnection) {
  return (
    dbConnection.models.AvisPersonnel ||
    dbConnection.model("AvisPersonnel", AvisPersonnelSchema)
  );
}

const createAvisPersonnel = async (avisPersonnelData, dbName) => {
  const avisPersonnels = await getAvisPersonnelModel(dbName);
  const avisPersonnel = new avisPersonnels(avisPersonnelData);
  return avisPersonnel.save();
};

const getAllAvisPersonnels = async (dbName) => {
  const avisPersonnels = await getAvisPersonnelModel(dbName);
  return await avisPersonnels.find();
};

const getAvisPersonnelById = async (id, dbName) => {
  const avisPersonnels = await getAvisPersonnelModel(dbName);
  return avisPersonnels.findById(id);
};

const updateAvisPersonnel = async (id, updateData, dbName) => {
  const avisPersonnels = await getAvisPersonnelModel(dbName);
  return avisPersonnels.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAvisPersonnel = async (id, dbName) => {
  const avisPersonnels = await getAvisPersonnelModel(dbName);
  return avisPersonnels.findByIdAndDelete(id);
};

const deleteManyAvisPersonnels = async (dbName, ids) => {
  const avisPersonnels = await getAvisPersonnelModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await avisPersonnels.deleteMany(query);
};

module.exports = {
  createAvisPersonnel,
  getAllAvisPersonnels,
  getAvisPersonnelById,
  updateAvisPersonnel,
  deleteAvisPersonnel,
  deleteManyAvisPersonnels,
};
