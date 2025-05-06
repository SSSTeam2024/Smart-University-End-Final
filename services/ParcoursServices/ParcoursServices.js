const parcoursDao = require("../../dao/ParcoursDao/ParcoursDao");
const { getDb } = require("../../config/dbSwitcher");

const createParcours = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const parcours = await parcoursDao.createParcours(userData, db);
    return parcours;
  } catch (error) {
    console.error("Error in creating parcours:", error);
    throw error;
  }
};

const updateParcours = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await parcoursDao.updateParcours(id, updateData, db);
};

const getAllParcours = async (useNew) => {
  const db = await getDb(useNew);
  return await parcoursDao.getAllParcours(db);
};

const deleteParcours = async (id, useNew) => {
  const db = await getDb(useNew);
  return await parcoursDao.deleteParcours(id, db);
};

const getParcourByValue = async ({ nom_parcours, code_parcours }, useNew) => {
  const db = await getDb(useNew);
  return await parcoursDao.getParcoursByValue(nom_parcours, code_parcours, db);
};

const getSemestresByParcoursId = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    const semestre = await parcoursDao.getSemestreByParcoursId(id, db);
    if (!semestre) {
      throw new Error("semestre not found");
    }
    return semestre;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  deleteParcours,
  getAllParcours,
  updateParcours,
  createParcours,
  getParcourByValue,
  getSemestresByParcoursId,
};
