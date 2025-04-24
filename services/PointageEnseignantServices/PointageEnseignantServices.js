const PointageEnseignantDao = require("../../dao/PointageEnseignantDao/PointageEnseignantDao");

const createNewPointageEnseignant = async (pointageEnseignantData) => {
  return await PointageEnseignantDao.createPointageEnseignant(
    pointageEnseignantData
  );
};

const updatePointageEnseignant = async (id, updateData) => {
  return await PointageEnseignantDao.updatePointageEnseignant(id, updateData);
};

const getPointageEnseignantById = async (id) => {
  return await PointageEnseignantDao.getPointageEnseignantById(id);
};

const getAllPointageEnseignant = async () => {
  const result = await PointageEnseignantDao.getPointageEnseignants();
  return result;
};

const deletePointageEnseignant = async (id) => {
  return await PointageEnseignantDao.deletePointageEnseignant(id);
};

const getPointageByEnseignantId = async (enseignantId) => {
  return await PointageEnseignantDao.getPointageByEnseignantId(enseignantId);
};

module.exports = {
  createNewPointageEnseignant,
  updatePointageEnseignant,
  getPointageEnseignantById,
  getAllPointageEnseignant,
  deletePointageEnseignant,
  getPointageByEnseignantId,
};
