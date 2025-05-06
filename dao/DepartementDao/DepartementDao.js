const departementSchema = require("../../model/departementModel/DepartementModel");

function getDepartementModel(dbConnection) {
  return (
    dbConnection.models.Departement ||
    dbConnection.model("Departement", departementSchema)
  );
}

const createDepartement = async (departement, dbName) => {
  try {
    const departementModel = await getDepartementModel(dbName);
    return await departementModel.create(departement);
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};
const getDepartements = async (dbName) => {
  try {
    const departementModel = await getDepartementModel(dbName);
    return await departementModel
      .find()
      .populate("salles")
      .populate("sections");
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

const updateDepartement = async (id, updateData, dbName) => {
  try {
    const departementModel = await getDepartementModel(dbName);
    return await departementModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("salles");
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

const deleteDepartement = async (id, dbName) => {
  try {
    const departementModel = await getDepartementModel(dbName);
    return await departementModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};

const getDepartementById = async (id, dbName) => {
  try {
    const departementModel = await getDepartementModel(dbName);
    return await departementModel
      .findById(id)
      .populate("salles")
      .populate("sections");
  } catch (error) {
    console.error("Error fetching department by ID:", error);
    throw error;
  }
};

module.exports = {
  createDepartement,
  getDepartements,
  updateDepartement,
  deleteDepartement,
  getDepartementById,
};
