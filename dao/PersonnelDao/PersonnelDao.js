const personnelSchema = require("../../model/PersonnelModel/PersonnelModel");

function getPersonnelModel(dbConnection) {
  return (
    dbConnection.models.Personnel ||
    dbConnection.model("Personnel", personnelSchema)
  );
}

const createPersonnel = async (personnel, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.create(personnel);
};

const getPersonnels = async (dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel
    .find()
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service");
};

const updatePersonnel = async (id, updateData, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePersonnel = async (id, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel.findByIdAndDelete(id);
};

const getPersonnelById = async (id, dbName) => {
  const personnelModel = getPersonnelModel(dbName);
  return await personnelModel
    .findById(id)
    .populate("etat_compte")
    .populate("categorie")
    .populate("grade")
    .populate("poste")
    .populate("service");
};

const assignPapierToPersonnel = async (personnelId, papierIds, dbName) => {
  try {
    const personnelModel = getPersonnelModel(dbName);
    const personnel = await personnelModel.findById(personnelId);
    if (!personnel) {
      throw new Error("Personnel not found");
    }
    for (const paperId of papierIds) {
      personnel.papers.push(paperId);
    }

    await personnel.save();
    return personnel;
  } catch (error) {
    console.error("Error in assignPapierToPersonnel:", error);
    throw new Error(`Service Error: DAO Error: ${error.message}`);
  }
};

module.exports = {
  createPersonnel,
  getPersonnels,
  updatePersonnel,
  getPersonnelById,
  deletePersonnel,
  assignPapierToPersonnel,
};
