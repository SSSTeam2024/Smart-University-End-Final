const PointageEnseignantDao = require("../../dao/PointageEnseignantDao/PointageEnseignantDao");
const { getDb } = require("../../config/dbSwitcher");

const createNewPointageEnseignant = async (pointageEnseignantData, useNew) => {
  const db = await getDb(useNew);
  return await PointageEnseignantDao.createPointageEnseignant(
    pointageEnseignantData,
    db
  );
};

const updatePointageEnseignant = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await PointageEnseignantDao.updatePointageEnseignant(
    id,
    updateData,
    db
  );
};

const getPointageEnseignantById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await PointageEnseignantDao.getPointageEnseignantById(id, db);
};

const getAllPointageEnseignant = async (useNew) => {
  const db = await getDb(useNew);
  const result = await PointageEnseignantDao.getPointageEnseignants(db);
  return result;
};

const deletePointageEnseignant = async (id, useNew) => {
  const db = await getDb(useNew);
  return await PointageEnseignantDao.deletePointageEnseignant(id, db);
};

const getPointageByEnseignantId = async (enseignantId, useNew) => {
  const db = await getDb(useNew);
  return await PointageEnseignantDao.getPointageByEnseignantId(
    enseignantId,
    db
  );
};

module.exports = {
  createNewPointageEnseignant,
  updatePointageEnseignant,
  getPointageEnseignantById,
  getAllPointageEnseignant,
  deletePointageEnseignant,
  getPointageByEnseignantId,
};
