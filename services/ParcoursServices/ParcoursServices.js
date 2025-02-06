const parcoursDao = require("../../dao/ParcoursDao/ParcoursDao");

const createParcours = async (userData) => {
  try {
    const parcours = await parcoursDao.createParcours(userData);

    return parcours;
  } catch (error) {
    console.error("Error in creating parcours:", error);
    throw error;
  }
};

const updateParcours = async (id, updateData) => {
  return await parcoursDao.updateParcours(id, updateData);
};

const getAllParcours = async () => {
  return await parcoursDao.getAllParcours();
};

const deleteParcours = async (id) => {
  return await parcoursDao.deleteParcours(id);
};

const getParcourByValue = async ({ nom_parcours, code_parcours }) => {
  return await parcoursDao.getParcoursByValue(nom_parcours, code_parcours);
};

module.exports = {
  deleteParcours,
  getAllParcours,
  updateParcours,
  createParcours,
  getParcourByValue,
};
