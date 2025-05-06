const CycleDao = require("../../dao/CycleDao/CycleDao");
const { getDb } = require("../../config/dbSwitcher");

const registerCycle = async (userData, useNew) => {
  const db = await getDb(useNew);
  return await CycleDao.createCycle(userData, db);
};

const updateCycleDao = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await CycleDao.updateCycle(id, updateData, db);
};

const getCycleDaoById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await CycleDao.getCycleById(id, db);
};

const getAllCycleDao = async (useNew) => {
  const db = await getDb(useNew);
  const result = await CycleDao.getCycles(db);
  return result;
};

const deleteCycleDao = async (id, useNew) => {
  const db = await getDb(useNew);
  return await CycleDao.deleteCycle(id, db);
};

const getCycleByValue = async ({ cycle_ar, cycle_fr }, useNew) => {
  const db = await getDb(useNew);
  return await CycleDao.getCycleByValue(cycle_ar, cycle_fr, db);
};

module.exports = {
  getCycleByValue,
  deleteCycleDao,
  getAllCycleDao,
  getCycleDaoById,
  updateCycleDao,
  registerCycle,
};
