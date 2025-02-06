const modulesParcoursDao = require("../../dao/ModulesParcoursDao/ModulesParcoursDao");
const parcoursDao = require("../../dao/ParcoursDao/ParcoursDao");
const matiereDao = require("../../dao/MatiereDao/MatiereDao");

const createModulesParcours = async (userData) => {
  try {
    const moduleParcours = await modulesParcoursDao.createModuleParcours(
      userData
    );
    console.log("moduleParcours", moduleParcours);

    // Update the related Parcours with the created module ID
    const parcours = await parcoursDao.addModuleToParcours(
      userData.parcours,
      moduleParcours._id
    );
    console.log("parcours", parcours);
    if (!parcours) {
      throw new Error("Failed to update Parcours with the new module.");
    }

    return moduleParcours;
  } catch (error) {
    console.error("Error in creating module parcours:", error);
    throw error;
  }
};

const updateModuleParcours = async (id, updateData) => {
  return await modulesParcoursDao.updateModuleParcours(id, updateData);
};

const getAllModulesParcours = async () => {
  return await modulesParcoursDao.getAllModulesParcours();
};

const deleteModulesParcours = async (id) => {
  return await modulesParcoursDao.deleteModuleParcours(id);
};

const assignMatieresToModule = async (moduleId, matieres) => {
  try {
    // Find the module by ID and update it with the new matieres
    const moduleParcours = await modulesParcoursModel
      .findByIdAndUpdate(
        moduleId,
        { $push: { matiere: { $each: matieres } } },
        { new: true }
      )
      .populate("matiere"); // Optionally populate matiere for the response
    return moduleParcours;
  } catch (error) {
    console.error("Error assigning matieres to module:", error);
    throw error;
  }
};

const getModuleByCode = async ({ code_Ue }) => {
  return await modulesParcoursDao.getModuleeByCode(code_Ue);
};

module.exports = {
  deleteModulesParcours,
  getAllModulesParcours,
  updateModuleParcours,
  createModulesParcours,
  getModuleByCode,
};
