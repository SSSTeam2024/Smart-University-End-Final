const leaveBalanceDao = require("../../dao/CongeDao/LeaveBalanceDao");

const { getDb } = require("../../config/dbSwitcher");

const createLeaveBalance = async (leaveBalanceData, useNew) => {
  const db = await getDb(useNew);
  return leaveBalanceDao.createLeaveBalance(leaveBalanceData, db);
};
const createOrUpdateLeaveBalance = async (leaveBalanceData, useNew) => {
  const db = await getDb(useNew);
  return leaveBalanceDao.createOrUpdateLeaveBalance(leaveBalanceData, db);
};

const getAllLeaveBalance = async (useNew) => {
  const db = await getDb(useNew);
  return leaveBalanceDao.getAllLeaveBalance(db);
};

const getLeaveBalanceById = async (id, useNew) => {
  const db = await getDb(useNew);
  return leaveBalanceDao.getLeaveBalanceById(id, db);
};

const updateLeaveBalance = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return leaveBalanceDao.updateLeaveBalance(id, updateData, db);
};

const deleteLeaveBalance = async (id, useNew) => {
  const db = await getDb(useNew);
  return leaveBalanceDao.deleteLeaveBalance(id, db);
};

module.exports = {
  createLeaveBalance,
  createOrUpdateLeaveBalance,
  getAllLeaveBalance,
  getLeaveBalanceById,
  updateLeaveBalance,
  deleteLeaveBalance,
};
