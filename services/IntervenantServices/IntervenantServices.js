const IntervenantDao = require("../../dao/IntervenantDao/IntervenantDao");
const { getDb } = require("../../config/dbSwitcher");

const createIntervenant = async (intervenant, useNew) => {
  const db = await getDb(useNew);
  return await IntervenantDao.createIntervenant(intervenant, db);
};

const updateIntervenant = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await IntervenantDao.updateIntervenant(id, updateData, db);
};

const getAllIntervenant = async (useNew) => {
  const db = await getDb(useNew);
  const result = await IntervenantDao.getIntervenants(db);
  return result;
};

const deleteIntervenant = async (id, useNew) => {
  const db = await getDb(useNew);
  return await IntervenantDao.deleteIntervenant(id, db);
};

module.exports = {
  createIntervenant,
  updateIntervenant,
  getAllIntervenant,
  deleteIntervenant,
};
