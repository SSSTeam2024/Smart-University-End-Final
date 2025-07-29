const CommissionDao = require("../../dao/CommissionDao/CommissionDao");
const { getDb } = require("../../config/dbSwitcher");

const createCommission = async (commissionData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await CommissionDao.createCommission(commissionData, db);
  } catch (error) {
    console.error("create new commission in services: ", error);
  }
};

const updateCommission = async (id, updateData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await CommissionDao.updateCommission(id, updateData, db);
  } catch (error) {
    console.error("update commission in services: ", error);
  }
};

const getAllCommissions = async (useNew) => {
  try {
    const db = await getDb(useNew);
    const result = await CommissionDao.getCommissions(db);
    return result;
  } catch (error) {
    console.error("Get all commissions in services: ", error);
  }
};

const deleteCommission = async (id, useNew) => {
  try {
    const db = await getDb(useNew);
    return await CommissionDao.deleteCommission(id, db);
  } catch (error) {
    console.error("Delete commission in services: ", error);
  }
};

module.exports = {
  deleteCommission,
  getAllCommissions,
  updateCommission,
  createCommission,
};
