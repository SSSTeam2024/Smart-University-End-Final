const CycleDao = require("../../dao/CycleDao/CycleDao");

const registerCycle = async (userData) => {
  return await CycleDao.createCycle(userData);
};

const updateCycleDao = async (id, updateData) => {
  return await CycleDao.updateCycle(id, updateData);
};

const getCycleDaoById = async (id) => {
  return await CycleDao.getCycleById(id);
};

const getAllCycleDao = async () => {
  const result = await CycleDao.getCycles();
  return result;
};

const deleteCycleDao = async (id) => {
  return await CycleDao.deleteCycle(id);
};

const getCycleByValue = async ({ cycle_ar, cycle_fr }) => {
  return await CycleDao.getCycleByValue(cycle_ar, cycle_fr);
};

module.exports = {
  getCycleByValue,
  deleteCycleDao,
  getAllCycleDao,
  getCycleDaoById,
  updateCycleDao,
  registerCycle,
};
