const AvisCommissionDao = require("../../dao/AvisCommissionDao/AvisCommissionDao");
const { getDb } = require("../../config/dbSwitcher");

const createAvisCommission = async (avisCommission, useNew) => {
  const db = await getDb(useNew);
  return await AvisCommissionDao.createAvisCommission(avisCommission, db);
};

const updateAvisCommission = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await AvisCommissionDao.updateAvisCommission(id, updateData, db);
};

const getAvisCommissions = async (useNew) => {
  const db = await getDb(useNew);
  const result = await AvisCommissionDao.getAvisCommissions(db);
  return result;
};

const deleteAvisCommission = async (id, useNew) => {
  const db = await getDb(useNew);
  return await AvisCommissionDao.deleteAvisCommission(id, db);
};

module.exports = {
  createAvisCommission,
  updateAvisCommission,
  getAvisCommissions,
  deleteAvisCommission,
};
