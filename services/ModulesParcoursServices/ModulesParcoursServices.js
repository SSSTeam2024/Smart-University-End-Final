const modulesParcoursDao = require("../../dao/ModulesParcoursDao/ModulesParcoursDao");
const parcoursDao = require("../../dao/ParcoursDao/ParcoursDao");
const { getDb } = require("../../config/dbSwitcher");

const createModulesParcours = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const moduleParcours = await modulesParcoursDao.createModuleParcours(
      userData,
      db
    );
    const parcours = await parcoursDao.addModuleToParcours(
      userData.parcours,
      moduleParcours._id,
      db
    );
    if (!parcours) {
      throw new Error("Failed to update Parcours with the new module.");
    }
    return moduleParcours;
  } catch (error) {
    console.error("Error in creating module parcours:", error);
    throw error;
  }
};

const updateModuleParcours = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await modulesParcoursDao.updateModuleParcours(id, updateData, db);
};

const getAllModulesParcours = async (useNew) => {
  const db = await getDb(useNew);
  return await modulesParcoursDao.getAllModulesParcours(db);
};

const deleteModulesParcours = async (id, useNew) => {
  const db = await getDb(useNew);
  return await modulesParcoursDao.deleteModuleParcours(id, db);
};

const getModuleByCode = async ({ code_Ue }, useNew) => {
  const db = await getDb(useNew);
  return await modulesParcoursDao.getModuleeByCode(code_Ue, db);
};

// const assignMatieresToModule = async (moduleId, matieres) => {
//   try {
//     const moduleParcours = await modulesParcoursModel
//       .findByIdAndUpdate(
//         moduleId,
//         { $push: { matiere: { $each: matieres } } },
//         { new: true }
//       )
//       .populate("matiere"); // Optionally populate matiere for the response
//     return moduleParcours;
//   } catch (error) {
//     console.error("Error assigning matieres to module:", error);
//     throw error;
//   }
// };

module.exports = {
  deleteModulesParcours,
  getAllModulesParcours,
  updateModuleParcours,
  createModulesParcours,
  getModuleByCode,
};
