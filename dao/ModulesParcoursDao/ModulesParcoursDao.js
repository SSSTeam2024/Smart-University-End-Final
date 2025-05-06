const moduleParcoursSchema = require("../../model/ModulesParcoursModel/ModulesParcoursModel");

function getModuleParcoursModel(dbConnection) {
  return (
    dbConnection.models.ModuleParcours ||
    dbConnection.model("ModuleParcours", moduleParcoursSchema)
  );
}

const createModuleParcours = async (userData, dbName) => {
  try {
    const moduleParcours = await getModuleParcoursModel(dbName);
    return await moduleParcours.create(userData);
  } catch (error) {
    throw error;
  }
};

const getAllModulesParcours = async (dbName) => {
  try {
    const moduleParcours = await getModuleParcoursModel(dbName);
    return await moduleParcours
      .find()
      .populate("parcours")
      .populate("matiere")
      .populate("parcours");
  } catch (error) {
    console.error("Error fetching module parcours:", error);
    throw error;
  }
};
const updateModuleParcours = async (id, updateData, dbName) => {
  try {
    const moduleParcours = await getModuleParcoursModel(dbName);
    return await moduleParcours.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating module parcours:", error);
    throw error;
  }
};

const deleteModuleParcours = async (id, dbName) => {
  const moduleParcours = await getModuleParcoursModel(dbName);
  return await moduleParcours.findByIdAndDelete(id);
};

// add matiere to module
const addMatiereToModule = async (moduleId, matiereId, dbName) => {
  try {
    const moduleParcours = await getModuleParcoursModel(dbName);
    return await moduleParcours.findByIdAndUpdate(
      moduleId,
      { $push: { matieres: matiereId } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const getModuleeByCode = async (code_Ue, dbName) => {
  const moduleParcours = await getModuleParcoursModel(dbName);
  return await moduleParcours.findOne({ code_Ue });
};

module.exports = {
  deleteModuleParcours,
  updateModuleParcours,
  getAllModulesParcours,
  createModuleParcours,
  addMatiereToModule,
  getModuleeByCode,
};
